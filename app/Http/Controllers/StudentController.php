<?php

namespace App\Http\Controllers;

use App\Models\Aspiration;
use App\Models\Category;
use App\Models\Notification;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function homePage()
    {
        $userId = Auth::id();

        return inertia('Student/Home', [
            'status' => [
                'submitted' => Aspiration::where('user_id', $userId)->where('status', 'Submitted')->count(),
                'proccess'  => Aspiration::where('user_id', $userId)->where('status', 'Proccess')->count(),
                'completed' => Aspiration::where('user_id', $userId)->where('status', 'Completed')->count(),
                'rejected'  => Aspiration::where('user_id', $userId)->where('status', 'Rejected')->count(),
            ],
            'recentAspi' => Auth::user()->aspiration()
                ->latest()
                ->take(4)
                ->get(),
        ]);
    }

    public function aspirationPage(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort');
        $filters = $request->only(['search', 'sort', 'status', 'category']);

        $query = Aspiration::with('category')
            ->when($search, function ($query, $search) {
                $query->where('subject', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            });


        if ($sort === 'name') {
            $query->orderBy('subject', 'asc');
        } elseif ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $aspirations = $query->paginate(100)->withQueryString();

        return Inertia::render('Student/Aspirations', [
            'aspirations' => $aspirations,
            'categories' => Category::all(),
            'filters' => $filters,
        ]);
    }

    public function addAspirations(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required',
            'photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'location' => 'required',
            'urgency' => 'required',
            'caption' => 'required',
            'category_id' => 'required|exists:categories,id'
        ], [
            'subject.required' => 'Masukan judul aspirasi',
            'photo.required' => 'Mohon sertakan foto bukti',
            'photo.mimes' => 'Hanya untuk file png,jpg, dan jpeg',
            'photo.max' => 'Ukuran file maximal 2MB',
            'location.required' => 'Mohon masukan lokasi',
            'urgency.required' => 'Apa tingkat kepentingan masalah tersebut',
            'caption.required' => 'Mohon jelaskan mengenai aspirasi anda',
            'category_id.required' => 'Pilih kategori sesuai laporan anda'
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('aspirations', 'public');
            $validated['photo'] = $path;
        }

        Aspiration::create([
            'user_id' => Auth::user()->id,
            'subject' => $validated['subject'],
            'photo' => $validated['photo'],
            'location' => $validated['location'],
            'urgency' => $validated['urgency'],
            'status' => 'Submitted',
            'caption' => $validated['caption'],
            'category_id' => $validated['category_id']
        ]);

        return redirect('/student/aspirations');
    }

    public function showAspiration(Aspiration $aspiration)
    {
        $aspiration->load(['user', 'category']);

        return inertia('Student/Detail', [
            'aspiration' => $aspiration,
            'categories' => Category::all()
        ]);
    }

    public function pageNotif()
    {
        $notifications = Notification::with(['fromUser', 'aspiration', 'respons'])->where('user_id', Auth::id())->latest()->get();
        return inertia('Student/Responses', [
            'Notifications' => $notifications
        ]);
    }
}
