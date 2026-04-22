<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aspiration extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'caption',
        'status',
        'photo',
        'location',
        'category_id',
        'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function response(){
        return $this->hasMany(Response::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
