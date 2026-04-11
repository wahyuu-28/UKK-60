<?php

namespace App\Events;

use App\Models\Aspiration;
use App\Models\Response;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendResponse implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Response $response)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('respons.' . $this->response->user_id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->response->aspiration_id,
            'message' => 'Heyy, ada update pada laporanmu!',
            'subject' => $this->response->aspiration->subject,
            'caption' => $this->response->caption
        ];
    }
}
