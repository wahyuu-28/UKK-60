<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function addCategory(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string'
        ]);

        $category = Category::where('category_name', $request->category_name)->first();

        if ($category) {
            return back()->withErrors(['category_name' => 'Category sudah pernah ditambahkan']);
        } else {

            Category::create([
                'category_name' => $validated['category_name']
            ]);
        }

        return redirect('/admin/categories');
    }

    public function editCategory(Request $request, Category $category)
    {
        $validated = $request->validate([
            'category_name' => 'required|string'
        ]);

        $category->update($validated);

        return redirect('/admin/categories');
    }

    public function desCategory(Request $request, Category $category)
    {
        $category->delete();

        return redirect('/admin/categories');
    }
}
