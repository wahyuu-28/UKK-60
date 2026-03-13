<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'from_user_id',
        'aspiration_id',
        'subject',
        'caption',
        'photo'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function aspiration(){
        return $this->belongsTo(Aspiration::class);
    }
}
