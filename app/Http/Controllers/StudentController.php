<?php

namespace App\Http\Controllers;

use App\Models\Aspiration;
use App\Models\Category;
use App\Models\Notification;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\CssSelector\Node\FunctionNode;

class StudentController extends Controller
{
    public function homePage()
    {
        $userId = Auth::id();
        return inertia('Student/Home', [
            'status' => [
                'submitted' => Aspiration::where('user_id', $userId)->where('status', 'Submitted')->count(),
                'process' => Aspiration::where('user_id', $userId)->where('status', 'Process')->count(),
                'rejected' => Aspiration::where('user_id', $userId)->where('status', 'Rejected')->count(),
                'completed' => Aspiration::where('user_id', $userId)->where('status', 'Completed')->count(),
            ],
            'recentAspi' => Auth::user()->aspiration()->limit(4)->get()
        ]);
    }

    public function aspirationPage(Request $request)
    {
        $query = Aspiration::with('category')->where('user_id', Auth::id());
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
        return inertia('Student/Aspirations', [
            'aspirations' => $aspirations,
            'categories' => Category::all(),
            'filters' => $filters
        ]);
    }

    public function showAspiration(Request $request, Aspiration $aspiration)
    {
        $aspiration->load(['category', 'user.siswa', 'response']);

        return inertia('Student/Detail', [
            'aspiration' => $aspiration,
            'categories' => Category::all()
        ]);
    }

    public function notificationsPage(Request $request, Response $response){
        $Notifications = Notification::with(['user', 'response', 'aspiration'])->where('user_id', Auth::id())->latest()->get();
        return inertia('Student/Responses', [
            'Notifications' => $Notifications
        ]);
    }
}
