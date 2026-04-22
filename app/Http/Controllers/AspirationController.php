<?php

namespace App\Http\Controllers;

use App\Models\Aspiration;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\CssSelector\Node\FunctionNode;

class AspirationController extends Controller
{
    public function addAspiration(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string',
            'caption' => 'required|string',
            'photo' => 'required|image|mimes:jpg,png,jpeg|max:2048',
            'location' => 'required',
            'category_id' => 'required',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('aspirations', 'public');
            $validated['photo'] = $path;
        }

        Aspiration::create([
            'subject' => $validated['subject'],
            'caption' => $validated['caption'],
            'status' => 'Submitted',
            'photo' => $validated['photo'],
            'location' => $validated['location'],
            'category_id' => $validated['category_id'],
            'user_id' => Auth::id()
        ]);

        return redirect('/student/aspirations');
    }

    public function  editAspiration(Request $request, Aspiration $aspiration)
    {
        $validated = $request->validate([
            'subject' => 'required|string',
            'caption' => 'required|string',
            'photo' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            'location' => 'required',
            'category_id' => 'required',
        ]);

        if ($request->hasFile('photo')) {
            Storage::disk('public')->delete($aspiration->photo ?? '');
            $validated['photo'] = $request->file('photo')->store('aspirations', 'public');
        } else {
            unset($validated['photo']);
        }

        $aspiration->update($validated);
        return redirect("/admin/aspirations/{$aspiration->id}");
    }

    public function desAspiration(Request $request, Aspiration $aspiration){
        Storage::disk('public')->delete($aspiration->photo ?? '');

        $aspiration->delete();

        return redirect('/admin/aspirations');
    }
}
