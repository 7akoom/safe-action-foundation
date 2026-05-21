<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactMessageResource\Pages;
use App\Models\ContactMessage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationLabel = 'Contact Messages';

    protected static ?string $navigationGroup = 'Communication';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Sender Information')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('name')->disabled(),
                    Forms\Components\TextInput::make('email')->disabled(),
                    Forms\Components\TextInput::make('phone')->disabled(),
                    Forms\Components\TextInput::make('subject')->disabled(),
                ]),

            Forms\Components\Section::make('Message')
                ->schema([
                    Forms\Components\Textarea::make('message')
                        ->disabled()
                        ->rows(8),
                ]),

            Forms\Components\Section::make('Status')
                ->columns(2)
                ->schema([
                    Forms\Components\Toggle::make('is_read'),
                    Forms\Components\DateTimePicker::make('read_at'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\IconColumn::make('is_read')
                    ->boolean()
                    ->label('Read'),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->searchable(),

                Tables\Columns\TextColumn::make('subject')
                    ->searchable()
                    ->limit(40),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_read')
                    ->label('Read status'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->label('View'),

                Tables\Actions\Action::make('markAsRead')
                    ->label('Mark as read')
                    ->icon('heroicon-o-check-circle')
                    ->visible(fn(ContactMessage $record): bool => ! $record->is_read)
                    ->action(function (ContactMessage $record): void {
                        $record->update([
                            'is_read' => true,
                            'read_at' => now(),
                        ]);
                    }),

                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactMessages::route('/'),
            'edit' => Pages\EditContactMessage::route('/{record}/edit'),
        ];
    }
}
