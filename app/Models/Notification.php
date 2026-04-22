<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_user_id',
        'user_id',
        'aspiration_id',
        'response_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function aspiration(){
        return $this->belongsTo(Aspiration::class);
    }
    public function response(){
        return $this->belongsTo(Response::class);
    }
}
