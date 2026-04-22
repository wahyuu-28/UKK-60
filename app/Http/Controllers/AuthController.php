<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\error;

class AuthController extends Controller
{
    public function loginAdmin(Request $request)
    {
        $request->validate([
            'nip' => 'required|string',
            'password' => 'required|string'
        ]);

        $admin = Admin::where('nip', $request->nip)->first();

        if (!$admin) {
            return back()->withErrors(['nip' => 'NIP tidak terdaftar di database']);
        }

        $user = $admin->user;

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Password tidak sesuai']);
        }

        Auth::login($user);
        $request->session()->regenerate();
        redirect()->route('homeAdmin');
    }

    public function loginStudent(Request $request)
    {
        $request->validate([
            'nis' => 'required|string',
            'password' => 'required|string'
        ]);

        $student = Student::where('nis', $request->nis)->first();

        if (!$student) {
            return back()->withErrors(['nis' => 'NIS tidak terdaftar di database']);
        }

        $user = $student->user;

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Password tidak sesuai']);
        }

        Auth::login($user);
        $request->session()->regenerate();
        redirect()->route('homeStudent');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerate();

        return redirect()->route('login');
    }

    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'nis' => 'required|string',
            'grade' => 'required|string'
        ]);

        $student = Student::where('nis', $request->nis)->first();
        $email = User::where('email', $request->email)->first();
        if ($email) {
            return back()->withErrors(['email' => 'Email sudah terdaftar di database']);
        } elseif ($student) {
            return back()->withErrors(['nis' => 'NIS sudah terdaftar di database']);
        } else {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'role' => 'Student',
                'password' => Hash::make($validated['password']),
            ]);

            Student::create([
                'nis' => $validated['nis'],
                'grade' => $validated['grade'],
                'user_id' => $user->id
            ]);
        }

        return redirect('/admin/users');
    }
}
