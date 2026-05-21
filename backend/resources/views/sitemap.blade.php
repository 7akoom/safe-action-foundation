{!! '<'.'?xml version="1.0" encoding="UTF-8"?'.'>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ url('/') }}</loc>
    </url>

    <url>
        <loc>{{ url('/about') }}</loc>
    </url>

    <url>
        <loc>{{ url('/programs') }}</loc>
    </url>

    <url>
        <loc>{{ url('/where-we-work') }}</loc>
    </url>

    <url>
        <loc>{{ url('/get-involved') }}</loc>
    </url>

    <url>
        <loc>{{ url('/news') }}</loc>
    </url>

    <url>
        <loc>{{ url('/contact') }}</loc>
    </url>

    <url>
        <loc>{{ url('/donate') }}</loc>
    </url>

    @foreach ($programs as $program)
        <url>
            <loc>{{ url('/programs/' . $program->slug) }}</loc>
        </url>
    @endforeach

    @foreach ($news as $item)
        <url>
            <loc>{{ url('/news/' . $item->slug) }}</loc>
        </url>
    @endforeach
</urlset>