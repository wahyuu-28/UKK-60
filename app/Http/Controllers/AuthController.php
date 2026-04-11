<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function loginStudent(Request $request)
    {
        $request->validate([
            'nis' => 'required',
            'password' => 'required'
        ], [
            'nis.required' => 'NIS harus di isi',
            'password.required' => 'Masukan Password anda'
        ]);

        $student = Student::where('nis', $request->nis)->first();

        if (!$student) {
        return back()->withErrors(['nis' => 'NIS tidak terdaftar'])->withInput();
        }

        $user = $student->user;

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Password tidak sesuai']);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('homeStudent');
    }
    public function loginAdmin(Request $request)
    {
        $request->validate([
            'nip' => 'required',
            'password' => 'required'
        ], [
            'nip.required' => 'NIP harus di isi',
            'password.required' => 'Masukan Password anda'
        ]);

        $admin = Admin::where('nip', $request->nip)->first();

        if(!$admin){
            return back()->withErrors(['nip' => 'NIP tidak terdaftar'])->withInput();
        }

        $user  = $admin->user;

        if(!$user || !Hash::check($request->password, $user->password)){
            return back()->withErrors(['password' => 'Password tidak sesuai']);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('homeAdmin');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerate();

        return redirect()->route('logoutStudent');
    }
}
