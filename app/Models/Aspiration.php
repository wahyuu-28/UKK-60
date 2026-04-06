<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aspiration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject',
        'status',
        'photo',
        'location',
        'urgency',
        'caption',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function responses(){
        return $this->hasMany(Response::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
