<?php

namespace App\Http\Controllers;

use App\Models\Aspiration;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function homePage(){
        return inertia('Admin/Home', [
            'status' => [
                'submitted' => Aspiration::where('status', 'Submitted')->count(),
                'process' => Aspiration::where('status', 'Process')->count(),
                'rejected' => Aspiration::where('status', 'Rejected')->count(),
                'completed' => Aspiration::where('status', 'Completed')->count(),
            ],
            'recent' => Aspiration::latest()->take(6)->get()
        ]);
    }

    public function aspirationPage(Request $request)
    {
        $query = Aspiration::with('category');
        $search = $request->input('search');
        $sort = $request->input('sort');
        $filters = $request->only(['category', 'status', 'search', 'sort']);

        $query->when($search, function ($query, $search) {
            $query->where('subject', 'like', "%{$search}%");
        })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            });

        if ($sort === 'name') {
            $query->orderBy('subject', 'asc');
        } elseif ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $aspirations = $query->paginate(100)->withQueryString();
        return inertia('Admin/Aspirations', [
            'aspirations' => $aspirations,
            'categories' => Category::all(),
            'filters' => $filters
        ]);
    }

    public function showAspiration(Request $request, Aspiration $aspiration)
    {
        $aspiration->load(['category', 'user.siswa', 'response']);

        return inertia('Admin/Detail', [
            'aspiration' => $aspiration,
            'categories' => Category::all()
        ]);
    }

    public function categoryPage(Request $request){
        $search = $request->input('search');
        $query = Category::when($search, function($query, $search){
            $query->where('category_name', 'like', "%{$search}%");
        });

        $categories = $query->paginate(15)->withQueryString();

        return inertia('Admin/Categories', [
            'categories' => $categories
        ]);
    }

    public function usersPage(Request $request){
        $search = $request->input('search');

        $query = User::when($search, function($query, $search){
            $query->where('name', 'like', "%{$search}%");
        })
        ->when($search, function($query, $search){
            $query->where('email', 'like', "%{$search}%");
        });

        $users = $query->paginate(25)->withQueryString();
        return inertia('Admin/Users', [
            'users' => $users
        ]);
    }

    public function responsePage(Request $request, Aspiration $aspiration){
        $aspiration->load(['category', 'user.siswa']);

        return inertia('Admin/Responses', [
            'aspiration' => $aspiration
        ]);
    }
}
