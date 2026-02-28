<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Aspiration;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function addStudent(Request $request)
    {
        $search = $request->input('search');
        $users = User::with('siswa')->when($search, function($query, $search){
        $query->where('name', 'like', "%{$search}%")
            ->orwhere('email', 'like', "%{$search}%");
        })->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'search' => $search
        ]);

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

        return inertia('Admin/Users');
    }

    public function aspirationsPage(Request $request) {
        $search = $request->input('search');
        $aspirations = Aspiration::with('category')->get();

        return inertia('Admin/Aspirations', [
            'aspirations' => $aspirations,
            'search' => $search
        ]);
    }

    public function showAspiration($id){
        $aspiration = Aspiration::with('user')->findOrFail($id);

        return inertia('Admin/Detail', [
            'aspiration' => $aspiration
        ]);
    }
}
