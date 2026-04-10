<?php

namespace App\Http\Controllers;

use App\Events\SendResponse;
use App\Models\Admin;
use App\Models\Aspiration;
use App\Models\Category;
use App\Models\Notification;
use App\Models\Response;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function pageHome()
    {
        return inertia('Admin/Home', [
            'status' => [
                'submitted' => Aspiration::where('status', 'Submitted')->count(),
                'proccess' => Aspiration::where('status', 'Proccess')->count(),
                'completed' => Aspiration::where('status', 'Completed')->count(),
                'rejected' => Aspiration::where('status', 'Rejected')->count(),
            ],
            'recent' => Aspiration::latest()->limit(6)->get()
        ]);
    }

    public function pageUsers(Request $request)
    {
        $search = $request->input('search');
        $users = User::with('siswa')->when($search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orwhere('email', 'like', "%{$search}%");
        })->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'search' => $search
        ]);
    }

    public function addStudent(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'NIS' => 'required',
            'grade' => 'required'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'student'
        ]);

        Student::create([
            'user_id' => $user->id,
            'NIS' => $validated['NIS'],
            'grade' => $validated['grade']
        ]);


        return redirect()->back();
    }

    public function aspirationsPage(Request $request)
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

        return inertia('Admin/Aspirations', [
            'aspirations' => $aspirations,
            'categories' => Category::all(),
            'filters' => $filters,
        ]);
    }

    public function showAspiration(Aspiration $aspiration)
    {
        $aspiration->load(['user', 'category', 'responses']);
        return inertia('Admin/Detail', [
            'aspiration' => $aspiration,
            'categories' => Category::all()
        ]);
    }

    public function editAspiration(Request $request, Aspiration $aspiration)
    {
        $validated = $request->validate([
            'subject' => '',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'location' => '',
            'status' => '',
            'urgency' => '',
            'caption' => '',
            'category_id' => ''
        ]);

        unset($validated['photo']);

        if ($request->hasFile('photo')) {
            if ($aspiration->photo && Storage::disk('public')->exists($aspiration->photo)) {
                Storage::disk('public')->delete($aspiration->photo);
            }

            $validated['photo'] = $request->file('photo')->store('aspirations', 'public');
        }

        $aspiration->update($validated);

        return back()->with(['success' => 'Berhasil Mengupdate']);
    }

    public function destroyAspiration(Aspiration $aspiration)
    {
        if ($aspiration->photo && Storage::disk('public')->exists($aspiration->photo)) {
            Storage::disk('public')->delete($aspiration->photo);
        }

        $aspiration->delete();

        return redirect('/admin/aspirations');
    }

    public function pageCategory()
    {
        $categories = Category::with('aspirations')->paginate(10);

        return inertia('Admin/Categories', [
            'categories' => $categories
        ]);
    }

    public function addCategory(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required'
        ]);

        Category::create([
            'category_name' => $validated['category_name']
        ]);

        return redirect()->back();
    }

    public function editCategory(Request $request, Category $category)
    {
        $validated = $request->validate([
            'category_name' => 'required'
        ], [
            'category_name.required' => 'Nama Kateogori diperlukan'
        ]);

        $category->update($validated);

        return redirect('/admin/categories');
    }

    public function desCategory(Category $category)
    {
        $category->delete();

        return redirect('/admin/categories');
    }

    public function pageRespons(Aspiration $aspiration)
    {
        $aspiration->load(['user.siswa', 'category']);

        return inertia('Admin/Responses', [
            'aspiration' => $aspiration,
            'categories' => Category::all()
        ]);
    }

    public function respons(Request $request, Aspiration $aspiration)
    {
        $validated = $request->validate([
            'caption' => 'required',
            'status' => 'required',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('responses', 'public');
        }

        $response = Response::create([
            'user_id' => $aspiration->user_id,
            'aspiration_id' => $aspiration->id,
            'subject' => 'Ada yang baru nih dari laporan '. $aspiration->subject,
            'caption' => $validated['caption'],
            'photo' => $photoPath
        ]);

        $aspiration->update([
            'status' => $request->status
        ]);

        Notification::create([
            'user_id' => $aspiration->user_id,
            'from_user_id' => Auth::id(),
            'respons_id' => $response->id,
            'aspiration_id' => $aspiration->id,
            'is_read' => false
        ]);

        event(new SendResponse($response));

        return redirect("/admin/aspirations/{$aspiration->id}");
    }
}
