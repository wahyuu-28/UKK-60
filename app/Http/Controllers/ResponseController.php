<?php

namespace App\Http\Controllers;

use App\Events\SendResponse;
use App\Models\Aspiration;
use App\Models\Notification;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResponseController extends Controller
{
    public function response(Request $request, Aspiration $aspiration)
    {
        $validated = $request->validate([
            'status' => 'required',
            'caption' => 'required',
            'photo' => 'nullable|image|mimes:jpg,png,jpeg|max:2048'
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('responses', 'public');
            $validated['photo'] = $path;
        }

        $res = Response::create([
            'subject' => $aspiration->subject,
            'caption' => $validated['caption'],
            'photo' => $validated['photo'],
            'aspiration_id' => $aspiration->id,
            'user_id' => $aspiration->user_id
        ]);

        $aspiration->update([
            'status' => $request->status
        ]);

        Notification::create([
            'from_user_id' => Auth::id(),
            'user_id' => $aspiration->user_id,
            'aspiration_id' => $aspiration->id,
            'response_id' => $res->id
        ]);

        event(new SendResponse($res));
        return redirect("/admin/aspirations/{$aspiration->id}");
    }
}
