<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProgramResource\Pages;
use App\Models\Program;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProgramResource extends Resource
{
    protected static ?string $model = Program::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationLabel = 'Programs';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Basic Information')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('title_en')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (?string $state, Forms\Set $set) {
                            if ($state) {
                                $set('slug', Str::slug($state));
                            }
                        })
                        ->maxLength(255),

                    Forms\Components\TextInput::make('title_ar')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),

                    Forms\Components\TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->minValue(0),
                ]),

            Forms\Components\Section::make('Short Description')
                ->columns(2)
                ->schema([
                    Forms\Components\Textarea::make('short_description_en')
                        ->rows(3)
                        ->maxLength(1000),

                    Forms\Components\Textarea::make('short_description_ar')
                        ->rows(3)
                        ->maxLength(1000),
                ]),

            Forms\Components\Section::make('Full Description')
                ->columns(2)
                ->schema([
                    Forms\Components\RichEditor::make('description_en')
                        ->columnSpan(1),

                    Forms\Components\RichEditor::make('description_ar')
                        ->columnSpan(1),
                ]),

            Forms\Components\Section::make('Media')
                ->columns(2)
                ->schema([
                    Forms\Components\FileUpload::make('featured_image')
                        ->image()
                        ->directory('programs/images')
                        ->imageEditor(),
                ]),

            Forms\Components\Section::make('Publishing')
                ->columns(2)
                ->schema([
                    Forms\Components\Toggle::make('is_published')
                        ->default(true),

                    Forms\Components\DateTimePicker::make('published_at')
                        ->seconds(false),
                ]),

            Forms\Components\Section::make('SEO')
                ->columns(2)
                ->collapsed()
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
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Image')
                    ->getStateUsing(
                        fn(Program $record): ?string => $record->featured_image
                            ? asset('storage/' . $record->featured_image)
                            : null
                    )
                    ->square()
                    ->size(56),

                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published')
                    ->sortable(),

                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published'),
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
            'index' => Pages\ListPrograms::route('/'),
            'create' => Pages\CreateProgram::route('/create'),
            'edit' => Pages\EditProgram::route('/{record}/edit'),
        ];
    }
}
