<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('animals', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('species');
        $table->date('birthdate')->nullable();
        $table->string('breed')->nullable();
        $table->string('status')->default('Healthy');
        $table->timestamps();
    });
}
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
