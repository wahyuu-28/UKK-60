<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AspirationController extends Controller
{
    public function store(Request $request){
        $validated = $request->validate([
            'subject' => 'required',
            'photo' => 'required',
            'location' => 'required',
            'caption' => 'required',
            'category_id' => 'required'
        ]);

        
    }
}
