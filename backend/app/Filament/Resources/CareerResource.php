<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CareerResource\Pages;
use App\Models\Career;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CareerResource extends Resource
{
    protected static ?string $model = Career::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Careers';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Job Information')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('title_en')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (?string $state, Forms\Set $set): void {
                            if (! $state) {
                                return;
                            }

                            $set('slug', Str::slug($state));
                        })
                        ->maxLength(255),

                    Forms\Components\TextInput::make('title_ar')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),

                    Forms\Components\DatePicker::make('deadline'),

                    Forms\Components\TextInput::make('location_en')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('location_ar')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('employment_type_en')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('employment_type_ar')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('department_en')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('department_ar')
                        ->maxLength(255),

                    Forms\Components\Textarea::make('short_description_en')
                        ->rows(3)
                        ->columnSpanFull(),

                    Forms\Components\Textarea::make('short_description_ar')
                        ->rows(3)
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('description_en')
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('description_ar')
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('requirements_en')
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('requirements_ar')
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Application')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('apply_email')
                        ->email()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('apply_url')
                        ->url()
                        ->maxLength(255),

                    Forms\Components\Toggle::make('is_published')
                        ->default(true),
                ]),

            Forms\Components\Section::make('SEO')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('seo_title_en')
                        ->maxLength(255),

                    Forms\Components\TextInput::make('seo_title_ar')
                        ->maxLength(255),

                    Forms\Components\Textarea::make('seo_description_en')
                        ->rows(3),

                    Forms\Components\Textarea::make('seo_description_ar')
                        ->rows(3),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('deadline', 'asc')
            ->columns([
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('location_en')
                    ->label('Location')
                    ->searchable(),

                Tables\Columns\TextColumn::make('employment_type_en')
                    ->label('Type'),

                Tables\Columns\TextColumn::make('deadline')
                    ->date()
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published')
                    ->sortable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published'),
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
            'index' => Pages\ListCareers::route('/'),
            'create' => Pages\CreateCareer::route('/create'),
            'edit' => Pages\EditCareer::route('/{record}/edit'),
        ];
    }
}
