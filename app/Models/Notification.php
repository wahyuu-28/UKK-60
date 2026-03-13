<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'from_user_id',
        'respons_id',
        'aspiration_id',
        'is_read'
    ];

    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function aspiration(){
        return $this->belongsTo(Aspiration::class);
    }

    public function respons(){
        return $this->belongsTo(Response::class, 'respons_id');
    }
}
