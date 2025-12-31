import { getBaseSchema } from '@/utils/generateSchema';

export default function StructuredData() {
    const jsonLd = getBaseSchema();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
