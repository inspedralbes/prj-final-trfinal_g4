<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username');
            $table->binary('image')->nullable()->default(null);
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('admin')->default(false);
            $table->boolean('googleLogin')->default(false);
        });

        DB::table('users')->insert([
            'name'=> 'Ruben',
            'username'=> 'rubenlora',
            'email'=> 'a21rublormar@inspedralbes.cat',
            'password'=> '$2y$10$KBylaXtI7.lS4vdq2DBX7eFuPkafw/4KzVT882d/XmBZqRz7J6nre',
            'admin'=> true,
        ]);

        DB::table('users')->insert([
            'name'=> 'Julie Villegas',
            'username'=> 'julsluks',
            'email'=> 'a22betvilver@inspedralbes.cat',
            'password'=> '$2y$10$1opw2CB1RHEZorsHBIdonOJ8nBtTdZLrfqtDFYRYX1P7j7D992ooW'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
