<?php

namespace App\Http\Controllers;

use App\Models\Aspiration;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function aspirationPage(Request $request)
    {
        $categories = Category::all();
        $search = $request->input('search');
        $aspirations = Aspiration::with('category')->when($search, function ($q, $search) {
            $q->where('subject', 'like', "%{$search}%");
        })->latest()->paginate(25);

        return Inertia::render('Student/Aspirations', [
            'aspirations' => $aspirations,
            'search' => $search,
            'categories' => $categories
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

        return redirect('/student/aspiration');
    }

    public function showAspiration(Request $request){

    }
}
