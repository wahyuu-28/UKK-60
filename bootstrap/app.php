<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectByRole;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
         $middleware->web(append: [
        HandleInertiaRequests::class,
    ]);
        //wajib daftarin middlewarenya disini, kalo ga ['auth', 'role: admin/lainnya'] ga bakalan jalan
        $middleware->alias([
            'role' => RedirectByRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
