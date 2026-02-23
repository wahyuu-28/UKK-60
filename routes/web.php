<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return Auth::user()->redirectByRole();
    }

    return inertia('LandingPage');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return inertia('Auth/Login');
    });
    Route::post('login', [AuthController::class, 'login'])->name('login');
});

// Route Admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/home', function () {
        return inertia('Admin/Home');
    })->name('homeAdmin');

    Route::get('/sidebar', function () {
        return inertia('Admin/Sidebar');
    });

    Route::get('/aspirations', function () {
        return inertia('Admin/Aspirations');
    });

    Route::get('/categories', function () {
        return inertia('Admin/Categories');
    });

    Route::get('/history', function () {
        return inertia('Admin/History');
    });

    Route::get('/users', [AdminController::class, 'addStudent']);

    Route::post('/add/user', [AdminController::class, 'addStudent'])->name('addStudent');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// Route Siswa
Route::middleware(['auth', 'role:student'])->prefix('student')->group(function () {
    Route::get('/home', function () {
        return inertia('Student/Home');
    })->name('homeStudent');

    Route::get('/aspiration', [StudentController::class, 'aspirationPage']);
    Route::post('/aspiration', [StudentController::class, 'addAspirations']);

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
