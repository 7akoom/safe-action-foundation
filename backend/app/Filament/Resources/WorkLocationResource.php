<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WorkLocationResource\Pages;
use App\Models\WorkLocation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class WorkLocationResource extends Resource
{
    protected static ?string $model = WorkLocation::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';

    protected static ?string $navigationLabel = 'Where We Work';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Location Information')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('name_en')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('name_ar')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('country_en')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('country_ar')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('city_en')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('city_ar')
                        ->maxLength(255),

                    Forms\Components\Textarea::make('description_en')
                        ->rows(4)
                        ->columnSpanFull(),

                    Forms\Components\Textarea::make('description_ar')
                        ->rows(4)
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Media & Status')
                ->columns(2)
                ->schema([
                    Forms\Components\FileUpload::make('featured_image')
                        ->image()
                        ->disk('public')
                        ->directory('work-locations/images')
                        ->imageEditor()
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('sort_order')
                        ->numeric()
                        ->default(0),

                    Forms\Components\Toggle::make('is_active')
                        ->default(true),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Image')
                    ->getStateUsing(
                        fn(WorkLocation $record): ?string => $record->featured_image
                            ? asset('storage/' . $record->featured_image)
                            : null
                    )
                    ->square()
                    ->size(56),

                Tables\Columns\TextColumn::make('name_en')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('city_en')
                    ->label('City')
                    ->searchable(),

                Tables\Columns\TextColumn::make('country_en')
                    ->label('Country')
                    ->searchable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active')
                    ->sortable(),

                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListWorkLocations::route('/'),
            'create' => Pages\CreateWorkLocation::route('/create'),
            'edit' => Pages\EditWorkLocation::route('/{record}/edit'),
        ];
    }
}
