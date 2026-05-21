<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WebsiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::query()->updateOrCreate(
            ['id' => 1],
            [
                'organization_name_en' => 'Safe Action Foundation',
                'organization_name_ar' => 'مؤسسة Safe Action',

                'tagline_en' => 'Protection-Centered Humanitarian and Development Action',
                'tagline_ar' => 'عمل إنساني وتنموي يركز على الحماية',

                'hero_title_en' => 'Protecting Communities. Restoring Dignity.',
                'hero_title_ar' => 'نحمي المجتمعات ونستعيد الكرامة',

                'hero_description_en' => 'Safe Action Foundation delivers protection-centered humanitarian and development programs that strengthen safety, dignity, and resilience across Syria.',
                'hero_description_ar' => 'تقدم مؤسسة Safe Action برامج إنسانية وتنموية تركز على الحماية وتعزز الأمان والكرامة والصمود في مختلف أنحاء سوريا.',

                'about_title_en' => 'A National Foundation Rooted in Community Protection',
                'about_title_ar' => 'مؤسسة وطنية راسخة في الحماية المجتمعية',


                'about_description_en' => 'Safe Action Foundation is a national, non-profit, and non-governmental organization established in Syria to support vulnerable populations affected by conflict and displacement through integrated humanitarian and development interventions.',
                'about_description_ar' => 'مؤسسة Safe Action هي منظمة وطنية غير ربحية وغير حكومية تأسست في سوريا لدعم الفئات الأكثر ضعفًا والمتأثرة بالنزاع والنزوح من خلال تدخلات إنسانية وتنموية متكاملة.',

                'mission_title_en' => 'Our Mission',
                'mission_title_ar' => 'رسالتنا',

                'mission_description_en' => 'To provide integrated humanitarian and development assistance through protection-centered and community-based approaches, promoting rights, inclusion, and sustainable recovery for vulnerable populations.',
                'mission_description_ar' => 'تقديم المساعدة الإنسانية والتنموية المتكاملة من خلال نهج يركز على الحماية ويستند إلى المجتمع، بما يعزز الحقوق والشمول والتعافي المستدام للفئات الأكثر ضعفًا.',

                'vision_title_en' => 'Our Vision',
                'vision_title_ar' => 'رؤيتنا',

                'vision_description_en' => 'Communities live in safety, dignity, and resilience, free from harm and discrimination.',
                'vision_description_ar' => 'مجتمعات تعيش بأمان وكرامة وصمود، بعيدة عن الأذى والتمييز.',

                'beneficiaries_count' => 0,
                'programs_count' => 10,
                'volunteers_count' => 1700,
                'partners_count' => 0,

                'email' => 'program@Safeactionfoundation.org',
                'phone' => '+963 962 450 07 01',

                'location_en' => 'Damascus, Syria',
                'location_ar' => 'دمشق، سوريا',

                'seo_title_en' => 'Safe Action Foundation | Protection & Humanitarian Development in Syria',
                'seo_title_ar' => 'مؤسسة Safe Action | الحماية والتنمية الإنسانية في سوريا',

                'seo_description_en' => 'Safe Action Foundation is a Syrian humanitarian organization delivering protection-centered relief, recovery, and community resilience programs across Syria.',
                'seo_description_ar' => 'مؤسسة Safe Action هي منظمة إنسانية سورية تقدم برامج الحماية والتعافي وبناء المرونة المجتمعية في مختلف أنحاء سوريا.',
            ]
        );

        $programs = [
            [
                'title_en' => 'General Protection',
                'title_ar' => 'الحماية العامة',
                'short_description_en' => 'Protection services for vulnerable individuals and communities.',
                'short_description_ar' => 'خدمات الحماية للأفراد والمجتمعات الأكثر ضعفاً.',
            ],

            [
                'title_en' => 'Legal Assistance & Civil Documentation',
                'title_ar' => 'المساعدة القانونية والوثائق المدنية',
                'short_description_en' => 'Supporting access to legal rights and civil documentation.',
                'short_description_ar' => 'دعم الوصول إلى الحقوق القانونية والوثائق المدنية.',
            ],

            [
                'title_en' => 'Child Protection',
                'title_ar' => 'حماية الطفل',
                'short_description_en' => 'Creating safer environments for children and adolescents.',
                'short_description_ar' => 'توفير بيئات أكثر أماناً للأطفال واليافعين.',
            ],

            [
                'title_en' => 'Gender-Based Violence',
                'title_ar' => 'العنف القائم على النوع الاجتماعي',
                'short_description_en' => 'Prevention and response services for GBV survivors.',
                'short_description_ar' => 'خدمات الوقاية والاستجابة للناجين من العنف القائم على النوع الاجتماعي.',
            ],

            [
                'title_en' => 'Mental Health & Psychosocial Support',
                'title_ar' => 'الدعم النفسي والاجتماعي',
                'short_description_en' => 'Promoting mental wellbeing and psychosocial resilience.',
                'short_description_ar' => 'تعزيز الصحة النفسية والقدرة على الصمود المجتمعي.',
            ],

            [
                'title_en' => 'Community-Based Protection',
                'title_ar' => 'الحماية المجتمعية',
                'short_description_en' => 'Strengthening local protection systems and participation.',
                'short_description_ar' => 'تعزيز أنظمة الحماية المحلية والمشاركة المجتمعية.',
            ],

            [
                'title_en' => 'Social Cohesion & Peacebuilding',
                'title_ar' => 'التماسك الاجتماعي وبناء السلام',
                'short_description_en' => 'Encouraging peaceful coexistence and dialogue.',
                'short_description_ar' => 'تعزيز التعايش السلمي والحوار المجتمعي.',
            ],

            [
                'title_en' => 'Livelihoods & Economic Recovery',
                'title_ar' => 'سبل العيش والتعافي الاقتصادي',
                'short_description_en' => 'Supporting income generation and economic resilience.',
                'short_description_ar' => 'دعم توليد الدخل وتعزيز التعافي الاقتصادي.',
            ],

            [
                'title_en' => 'Early Recovery & Community Rehabilitation',
                'title_ar' => 'التعافي المبكر وإعادة تأهيل المجتمع',
                'short_description_en' => 'Rehabilitating community infrastructure and services.',
                'short_description_ar' => 'إعادة تأهيل البنية التحتية والخدمات المجتمعية.',
            ],

            [
                'title_en' => 'Awareness & Behavioral Change',
                'title_ar' => 'التوعية والتغيير السلوكي',
                'short_description_en' => 'Awareness campaigns promoting healthy community behaviors.',
                'short_description_ar' => 'حملات توعية لتعزيز السلوكيات المجتمعية الإيجابية.',
            ],
        ];

        foreach ($programs as $index => $program) {

            Program::query()->updateOrCreate(
                [
                    'slug' => Str::slug($program['title_en']),
                ],
                [
                    'title_en' => $program['title_en'],
                    'title_ar' => $program['title_ar'],

                    'slug' => Str::slug($program['title_en']),

                    'short_description_en' => $program['short_description_en'],
                    'short_description_ar' => $program['short_description_ar'],

                    'description_en' => $program['short_description_en'],
                    'description_ar' => $program['short_description_ar'],

                    'sort_order' => $index + 1,

                    'is_published' => true,

                    'seo_title_en' => $program['title_en'],
                    'seo_title_ar' => $program['title_ar'],

                    'seo_description_en' => $program['short_description_en'],
                    'seo_description_ar' => $program['short_description_ar'],
                ]
            );
        }
    }
}
