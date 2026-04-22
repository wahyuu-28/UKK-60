<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'caption',
        'photo',
        'aspiration_id',
        'user_id'
    ];

    public function aspiration(){
        return $this->belongsTo(Aspiration::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
