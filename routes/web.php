<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SendResponseController;
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
    Route::get('/home', [AdminController::class, 'pageHome'])->name('homeAdmin');

    Route::get('/respons/{aspiration}', [AdminController::class, 'pageRespons']);

    Route::post('/aspirations/{aspiration}/respons', [AdminController::class, 'respons']);

    Route::post('/send', SendResponseController::class);

    Route::get('/categories', [AdminController::class, 'pageCategory'])->name('pageCategory');

    Route::post('/categories', [AdminController::class, 'addCategory'])->name('addCategory');

    Route::get('/aspirations/{aspiration}', [AdminController::class, 'showAspiration'])->name('showAspiration');

    Route::get('/aspirations', [AdminController::class, 'aspirationsPage']);

    Route::put('/aspirations/{aspiration}', [AdminController::class, 'editAspiration'])->name('editAspiration');

    Route::delete('/aspirations/{aspiration}', [AdminController::class, 'destroyAspiration'])->name('destroyAspiration');

    Route::put('/categories/{category}', [AdminController::class, 'editCategory']);

    Route::delete('/categories/{category}', [AdminController::class, 'desCategory']);

    Route::get('/users', [AdminController::class, 'pageUsers']);

    Route::post('/users', [AdminController::class, 'addStudent'])->name('addStudent');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// Route Siswa
Route::middleware(['auth', 'role:student'])->prefix('student')->group(function () {
    Route::get('/home', [StudentController::class, 'homePage'])->name('homeStudent');

    Route::get('/notifications', [StudentController::class, 'pageNotif']);

    Route::get('/aspirations/{aspiration}', [StudentController::class, 'showAspiration']);

    Route::get('/aspirations', [StudentController::class, 'aspirationPage']);
    Route::post('/aspirations', [StudentController::class, 'addAspirations']);

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
