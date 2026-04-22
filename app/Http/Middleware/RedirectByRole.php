<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectByRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if(!Auth::check()){
            return redirect()->route('login');
        }

    $userRole = Auth::user()->role;
    
    if($userRole !== $role){
        return match($userRole){
            'admin' => redirect()->route('homeAdmin'),
            'student' => redirect()->route('homeStudent'),
            default => redirect()->route('login')
        };
    }
        return $next($request);
    }
}
