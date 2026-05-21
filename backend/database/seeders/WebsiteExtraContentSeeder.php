<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\WorkLocation;
use App\Models\Career;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class WebsiteExtraContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedWorkLocations();
        $this->seedNews();
        $this->seedCareers();
    }

    private function seedWorkLocations(): void
    {
        $locationImages = [
            'Damascus' => $this->downloadImage(
                'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=1200&auto=format&fit=crop',
                'damascus'
            ),

            'Aleppo' => $this->downloadImage(
                'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
                'aleppo'
            ),

            'Homs' => $this->downloadImage(
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
                'homs'
            ),

            'Raqqa' => $this->downloadImage(
                'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop',
                'raqqa'
            ),

            'Al-Hasaka' => $this->downloadImage(
                'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop',
                'hasaka'
            ),
        ];

        $locations = [
            [
                'name_en' => 'Damascus',
                'name_ar' => 'دمشق',
                'country_en' => 'Syria',
                'country_ar' => 'سوريا',
                'city_en' => 'Damascus',
                'city_ar' => 'دمشق',
                'description_en' => 'Headquarters and coordination office supporting humanitarian and development operations.',
                'description_ar' => 'المقر الرئيسي ومكتب التنسيق الداعم للعمليات الإنسانية والتنموية.',
                'sort_order' => 1,
                'featured_image' => $locationImages['Damascus'],
            ],

            [
                'name_en' => 'Aleppo',
                'name_ar' => 'حلب',
                'country_en' => 'Syria',
                'country_ar' => 'سوريا',
                'city_en' => 'Aleppo',
                'city_ar' => 'حلب',
                'description_en' => 'Community-based protection and humanitarian response activities.',
                'description_ar' => 'أنشطة الحماية المجتمعية والاستجابة الإنسانية.',
                'sort_order' => 2,
                'featured_image' => $locationImages['Aleppo'],
            ],

            [
                'name_en' => 'Homs',
                'name_ar' => 'حمص',
                'country_en' => 'Syria',
                'country_ar' => 'سوريا',
                'city_en' => 'Homs',
                'city_ar' => 'حمص',
                'description_en' => 'Programs focused on resilience, recovery, and social cohesion.',
                'description_ar' => 'برامج تركز على التعافي والمرونة والتماسك المجتمعي.',
                'sort_order' => 3,
                'featured_image' => $locationImages['Homs'],
            ],

            [
                'name_en' => 'Raqqa',
                'name_ar' => 'الرقة',
                'country_en' => 'Syria',
                'country_ar' => 'سوريا',
                'city_en' => 'Raqqa',
                'city_ar' => 'الرقة',
                'description_en' => 'Protection and awareness programs targeting vulnerable communities.',
                'description_ar' => 'برامج الحماية والتوعية الموجهة للمجتمعات الأكثر ضعفاً.',
                'sort_order' => 4,
                'featured_image' => $locationImages['Raqqa'],
            ],

            [
                'name_en' => 'Al-Hasaka',
                'name_ar' => 'الحسكة',
                'country_en' => 'Syria',
                'country_ar' => 'سوريا',
                'city_en' => 'Al-Hasaka',
                'city_ar' => 'الحسكة',
                'description_en' => 'Humanitarian interventions supporting internally displaced populations.',
                'description_ar' => 'تدخلات إنسانية لدعم المجتمعات والنازحين داخلياً.',
                'sort_order' => 5,
                'featured_image' => $locationImages['Al-Hasaka'],
            ],
        ];

        foreach ($locations as $location) {
            WorkLocation::query()->updateOrCreate(
                [
                    'name_en' => $location['name_en'],
                ],
                [
                    ...$location,
                    'is_active' => true,
                ]
            );
        }
    }

    private function seedNews(): void
    {
        $newsImages = [
            'safe-action-expands-community-protection-activities' => $this->downloadImage(
                'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
                'community-protection'
            ),

            'volunteer-network-supports-awareness-campaigns' => $this->downloadImage(
                'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop',
                'volunteers'
            ),

            'safe-action-strengthens-local-partnerships' => $this->downloadImage(
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
                'partnerships'
            ),
        ];

        $newsItems = [
            [
                'title_en' => 'Safe Action Expands Community Protection Activities',
                'title_ar' => 'مؤسسة Safe Action توسع أنشطة الحماية المجتمعية',

                'excerpt_en' => 'Safe Action Foundation continues expanding protection-focused humanitarian programs across several Syrian communities.',
                'excerpt_ar' => 'تواصل مؤسسة Safe Action توسيع برامج الحماية الإنسانية في عدة مجتمعات سورية.',

                'content_en' => '
                    <p>Safe Action Foundation has expanded its community protection activities to support vulnerable families and strengthen local resilience.</p>

                    <p>The initiative includes awareness campaigns, psychosocial support activities, and community engagement programs implemented through local teams and volunteers.</p>

                    <p>The organization continues working closely with communities to improve safety, dignity, and access to essential support services.</p>
                ',

                'content_ar' => '
                    <p>وسعت مؤسسة Safe Action أنشطة الحماية المجتمعية لدعم الأسر الأكثر ضعفاً وتعزيز قدرة المجتمعات المحلية على الصمود.</p>

                    <p>تتضمن المبادرة حملات توعية وأنشطة دعم نفسي اجتماعي وبرامج مشاركة مجتمعية يتم تنفيذها عبر الفرق المحلية والمتطوعين.</p>

                    <p>وتواصل المؤسسة العمل مع المجتمعات المحلية لتحسين الحماية والكرامة والوصول إلى الخدمات الأساسية.</p>
                ',

                'slug' => 'safe-action-expands-community-protection-activities',

                'seo_title_en' => 'Safe Action Expands Community Protection Activities',
                'seo_title_ar' => 'مؤسسة Safe Action توسع أنشطة الحماية المجتمعية',

                'seo_description_en' => 'Latest updates from Safe Action Foundation humanitarian programs.',
                'seo_description_ar' => 'آخر تحديثات برامج مؤسسة Safe Action الإنسانية.',

                'featured_image' => $newsImages['safe-action-expands-community-protection-activities'],

                'published_at' => now()->subDays(10),
            ],

            [
                'title_en' => 'Volunteer Network Supports Awareness Campaigns',
                'title_ar' => 'شبكة المتطوعين تدعم حملات التوعية',

                'excerpt_en' => 'More than 1700 volunteers contribute to awareness and outreach initiatives.',
                'excerpt_ar' => 'أكثر من 1700 متطوع يساهمون في حملات التوعية والوصول المجتمعي.',

                'content_en' => '
                    <p>Safe Action volunteer teams continue supporting humanitarian awareness campaigns across multiple regions.</p>

                    <p>The campaigns focus on community protection, social cohesion, and strengthening access to reliable information and services.</p>
                ',

                'content_ar' => '
                    <p>تواصل فرق المتطوعين في مؤسسة Safe Action دعم حملات التوعية الإنسانية في عدة مناطق.</p>

                    <p>تركز الحملات على الحماية المجتمعية والتماسك الاجتماعي وتعزيز الوصول إلى المعلومات والخدمات.</p>
                ',

                'slug' => 'volunteer-network-supports-awareness-campaigns',

                'seo_title_en' => 'Volunteer Network Supports Awareness Campaigns',
                'seo_title_ar' => 'شبكة المتطوعين تدعم حملات التوعية',

                'seo_description_en' => 'Safe Action volunteers support awareness and outreach activities.',
                'seo_description_ar' => 'متطوعو مؤسسة Safe Action يدعمون أنشطة التوعية والوصول المجتمعي.',

                'featured_image' => $newsImages['volunteer-network-supports-awareness-campaigns'],

                'published_at' => now()->subDays(5),
            ],

            [
                'title_en' => 'Safe Action Strengthens Local Partnerships',
                'title_ar' => 'مؤسسة Safe Action تعزز الشراكات المحلية',

                'excerpt_en' => 'Partnerships remain essential to delivering sustainable humanitarian impact.',
                'excerpt_ar' => 'تعد الشراكات عنصراً أساسياً لتحقيق أثر إنساني مستدام.',

                'content_en' => '
                    <p>Safe Action Foundation continues strengthening cooperation with local actors and community initiatives.</p>

                    <p>These partnerships contribute to improving humanitarian response quality and supporting sustainable development activities.</p>
                ',

                'content_ar' => '
                    <p>تواصل مؤسسة Safe Action تعزيز التعاون مع الجهات المحلية والمبادرات المجتمعية.</p>

                    <p>تسهم هذه الشراكات في تحسين جودة الاستجابة الإنسانية ودعم أنشطة التنمية المستدامة.</p>
                ',

                'slug' => 'safe-action-strengthens-local-partnerships',

                'seo_title_en' => 'Safe Action Strengthens Local Partnerships',
                'seo_title_ar' => 'مؤسسة Safe Action تعزز الشراكات المحلية',

                'seo_description_en' => 'Safe Action Foundation partnership and humanitarian coordination updates.',
                'seo_description_ar' => 'تحديثات حول شراكات وتنسيق مؤسسة Safe Action الإنساني.',

                'featured_image' => $newsImages['safe-action-strengthens-local-partnerships'],
                'published_at' => now()->subDays(2),
            ],
        ];

        foreach ($newsItems as $item) {
            News::query()->updateOrCreate(
                [
                    'slug' => $item['slug'],
                ],
                [
                    ...$item,
                    'is_published' => true,
                ]
            );
        }
    }

    private function seedCareers(): void
    {
        $careers = [
            [
                'title_en' => 'Protection Officer',
                'title_ar' => 'مسؤول حماية',
                'slug' => 'protection-officer',
                'location_en' => 'Damascus, Syria',
                'location_ar' => 'دمشق، سوريا',
                'employment_type_en' => 'Full-time',
                'employment_type_ar' => 'دوام كامل',
                'department_en' => 'Protection',
                'department_ar' => 'الحماية',
                'short_description_en' => 'Support protection activities, community outreach, and case referrals.',
                'short_description_ar' => 'دعم أنشطة الحماية والتواصل المجتمعي والإحالات.',
                'description_en' => '<p>The Protection Officer supports community-based protection activities, awareness sessions, referrals, and coordination with field teams.</p>',
                'description_ar' => '<p>يدعم مسؤول الحماية أنشطة الحماية المجتمعية وجلسات التوعية والإحالات والتنسيق مع الفرق الميدانية.</p>',
                'requirements_en' => '<ul><li>Experience in humanitarian or protection programming.</li><li>Strong communication and reporting skills.</li><li>Arabic required; English is an advantage.</li></ul>',
                'requirements_ar' => '<ul><li>خبرة في العمل الإنساني أو برامج الحماية.</li><li>مهارات تواصل وإعداد تقارير جيدة.</li><li>اللغة العربية مطلوبة والإنجليزية ميزة إضافية.</li></ul>',
                'apply_email' => 'program@Safeactionfoundation.org',
                'deadline' => now()->addDays(20)->toDateString(),
            ],
            [
                'title_en' => 'Community Mobilizer',
                'title_ar' => 'منشط مجتمعي',
                'slug' => 'community-mobilizer',
                'location_en' => 'Aleppo, Syria',
                'location_ar' => 'حلب، سوريا',
                'employment_type_en' => 'Full-time',
                'employment_type_ar' => 'دوام كامل',
                'department_en' => 'Community-Based Protection',
                'department_ar' => 'الحماية المجتمعية',
                'short_description_en' => 'Engage communities and support awareness and outreach activities.',
                'short_description_ar' => 'التواصل مع المجتمعات ودعم أنشطة التوعية والوصول المجتمعي.',
                'description_en' => '<p>The Community Mobilizer works with local communities to support participation, awareness, and access to services.</p>',
                'description_ar' => '<p>يعمل المنشط المجتمعي مع المجتمعات المحلية لدعم المشاركة والتوعية والوصول إلى الخدمات.</p>',
                'requirements_en' => '<ul><li>Good knowledge of the local community.</li><li>Experience in outreach or volunteer activities.</li><li>Strong interpersonal skills.</li></ul>',
                'requirements_ar' => '<ul><li>معرفة جيدة بالمجتمع المحلي.</li><li>خبرة في أنشطة التوعية أو العمل التطوعي.</li><li>مهارات تواصل قوية.</li></ul>',
                'apply_email' => 'program@Safeactionfoundation.org',
                'deadline' => now()->addDays(15)->toDateString(),
            ],
        ];

        foreach ($careers as $career) {
            Career::query()->updateOrCreate(
                ['slug' => $career['slug']],
                [
                    ...$career,
                    'is_published' => true,
                    'seo_title_en' => $career['title_en'],
                    'seo_title_ar' => $career['title_ar'],
                    'seo_description_en' => $career['short_description_en'],
                    'seo_description_ar' => $career['short_description_ar'],
                ]
            );
        }
    }

    private function downloadImage(string $url, string $filename): ?string
    {
        try {
            $contents = Http::timeout(20)->get($url)->body();

            $path = "news/images/{$filename}.jpg";

            Storage::disk('public')->put($path, $contents);

            return $path;
        } catch (\Throwable $e) {
            return null;
        }
    }
}
