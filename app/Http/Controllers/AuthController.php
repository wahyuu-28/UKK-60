<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return Auth::user()->redirectByRole();
        }

        return back()->withErrors('Gagal Login');
    }

    // public function  register(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required',
    //         'email' => 'required|email|unique:users,email',
    //         'password' => 'required',
    //         'role' => 'required'
    //     ]);

    //     User::create([
    //         'name' => $validated['name'],
    //         'email' => $validated['email'],
    //         'password' => Hash::make($validated['password']),
    //         'role' => $validated['role'],
    //     ]);

    //     return redirect()->route('homeAdmin');
    //     Auth::login();

    //     return $user->redirectByRole();
    // }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerate();

        return redirect('/login');
    }
}
