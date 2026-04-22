<?php

use Illuminate\Support\Facades\Broadcast;


// channel private buat nerima pesan update dari admin
Broadcast::channel('response.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
