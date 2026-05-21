<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Models\News;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationLabel = 'News';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Main Content')
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

                    Forms\Components\DateTimePicker::make('published_at'),

                    Forms\Components\Textarea::make('excerpt_en')
                        ->rows(3)
                        ->columnSpanFull(),

                    Forms\Components\Textarea::make('excerpt_ar')
                        ->rows(3)
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('content_en')
                        ->required()
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('content_ar')
                        ->required()
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Media & Status')
                ->columns(2)
                ->schema([
                    Forms\Components\FileUpload::make('featured_image')
                        ->image()
                        ->disk('public')
                        ->directory('news/images')
                        ->imageEditor()
                        ->columnSpanFull(),

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
            ->defaultSort('published_at', 'desc')
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Image')
                    ->getStateUsing(
                        fn(News $record): ?string => $record->featured_image
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

                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
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
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }
}
