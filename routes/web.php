<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AspirationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\StudentController;
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
    Route::get('/login/student', function () {
        return inertia('Auth/LoginStudent');
    })->name('login');
    Route::get('/login/admin', function () {
        return inertia('Auth/LoginAdmin');
    });

    Route::post('/login/admin', [AuthController::class, 'loginAdmin']);
    Route::post('/login/student', [AuthController::class, 'loginStudent']);
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('home', [AdminController::class, 'homePage'])->name('homeAdmin');
    Route::get('/aspirations', [AdminController::class, 'aspirationPage']);
    Route::get('/aspirations/{aspiration}', [AdminController::class, 'showAspiration']);
    Route::get('/categories', [AdminController::class, 'categoryPage']);
    Route::get('/users', [AdminController::class, 'usersPage']);
    Route::post('/users', [AuthController::class, 'addUser']);
    Route::post('/categories', [CategoryController::class, 'addCategory']);
    Route::get('response/{aspiration}', [AdminController::class, 'responsePage']);
    Route::post('/response/{aspiration}', [ResponseController::class, 'response']);
    Route::put('/aspirations/{aspiration}', [AspirationController::class, 'editAspiration']);
    Route::delete('/aspirations/{aspiration}', [AspirationController::class, 'desAspiration']);
    Route::put('/categories/{category}', [CategoryController::class, 'editCategory']);
    Route::delete('/categories/{category}', [CategoryController::class, 'desCategory']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth', 'role:student'])->prefix('student')->group(function () {
    Route::get('home', [StudentController::class, 'homePage'])->name('homeStudent');
    Route::get('/aspirations', [StudentController::class, 'aspirationPage']);
    Route::post('/aspirations', [AspirationController::class, 'addAspiration']);
    Route::get('/aspirations/{aspiration}', [StudentController::class, 'showAspiration']);
    Route::get('/notifications', [StudentController::class, 'notificationsPage']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
