<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Website Settings';

    protected static ?string $modelLabel = 'Website Settings';

    protected static ?string $pluralModelLabel = 'Website Settings';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Organization Info')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('organization_name_en')->required()->maxLength(255),
                    Forms\Components\TextInput::make('organization_name_ar')->required()->maxLength(255),
                    Forms\Components\TextInput::make('tagline_en')->maxLength(255),
                    Forms\Components\TextInput::make('tagline_ar')->maxLength(255),
                ]),

            Forms\Components\Section::make('Contact')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('email')->email()->maxLength(255),
                    Forms\Components\TextInput::make('phone')->tel()->maxLength(255),
                    Forms\Components\TextInput::make('location_en')->maxLength(255),
                    Forms\Components\TextInput::make('location_ar')->maxLength(255),
                ]),

            Forms\Components\Section::make('Home Hero')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('hero_title_en')->maxLength(255),
                    Forms\Components\TextInput::make('hero_title_ar')->maxLength(255),
                    Forms\Components\Textarea::make('hero_description_en')->rows(4)->columnSpanFull(),
                    Forms\Components\Textarea::make('hero_description_ar')->rows(4)->columnSpanFull(),
                    Forms\Components\FileUpload::make('hero_image')
                        ->image()
                        ->directory('settings/hero')
                        ->imageEditor()
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('About Section')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('about_title_en')->maxLength(255),
                    Forms\Components\TextInput::make('about_title_ar')->maxLength(255),

                    Forms\Components\Textarea::make('about_description_en')->rows(4),
                    Forms\Components\Textarea::make('about_description_ar')->rows(4),

                    Forms\Components\FileUpload::make('about_image')
                        ->image()
                        ->directory('settings/about')
                        ->imageEditor()
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Vision & Mission')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('mission_title_en')->maxLength(255),
                    Forms\Components\TextInput::make('mission_title_ar')->maxLength(255),

                    Forms\Components\Textarea::make('mission_description_en')->rows(4),
                    Forms\Components\Textarea::make('mission_description_ar')->rows(4),

                    Forms\Components\TextInput::make('vision_title_en')->maxLength(255),
                    Forms\Components\TextInput::make('vision_title_ar')->maxLength(255),

                    Forms\Components\Textarea::make('vision_description_en')->rows(4),
                    Forms\Components\Textarea::make('vision_description_ar')->rows(4),
                ]),

            Forms\Components\Section::make('Statistics')
                ->columns(4)
                ->schema([
                    Forms\Components\TextInput::make('beneficiaries_count')->numeric()->default(0),
                    Forms\Components\TextInput::make('programs_count')->numeric()->default(0),
                    Forms\Components\TextInput::make('volunteers_count')->numeric()->default(0),
                    Forms\Components\TextInput::make('partners_count')->numeric()->default(0),
                ]),

            Forms\Components\Section::make('Media')
                ->columns(2)
                ->schema([
                    Forms\Components\FileUpload::make('logo')
                        ->image()
                        ->directory('settings/logo')
                        ->imageEditor(),
                    Forms\Components\FileUpload::make('favicon')
                        ->image()
                        ->directory('settings/favicon')
                        ->imageEditor(),
                ]),

            Forms\Components\Section::make('Social Links')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('facebook_url')->url()->maxLength(255),
                    Forms\Components\TextInput::make('instagram_url')->url()->maxLength(255),
                    Forms\Components\TextInput::make('linkedin_url')->url()->maxLength(255),
                    Forms\Components\TextInput::make('twitter_url')->url()->maxLength(255),
                ]),

            Forms\Components\Section::make('SEO')
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('seo_title_en')->maxLength(255),
                    Forms\Components\TextInput::make('seo_title_ar')->maxLength(255),
                    Forms\Components\Textarea::make('seo_description_en')->rows(3),
                    Forms\Components\Textarea::make('seo_description_ar')->rows(3),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('organization_name_en')->label('Organization')->searchable(),
                Tables\Columns\TextColumn::make('email')->searchable(),
                Tables\Columns\TextColumn::make('updated_at')->dateTime()->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function canCreate(): bool
    {
        return Setting::query()->doesntExist();
    }

    public static function canDeleteAny(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/'),
            'create' => Pages\CreateSetting::route('/create'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
        ];
    }
}
