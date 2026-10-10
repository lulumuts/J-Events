import { allFeaturedSlugs, projects as fallbackProjects } from '../../data/projects';
import { assetUrl } from '../../utils/assetUrl';
import { coalesceArray, coalesceBlocks, coalesceString } from './coalesce';
import { buildFallbackContent } from './fallbackContent';
import { fileUrlFromSanity, imageSrcFromSanity } from './image';

function normalizeProject(doc, fallbackBySlug) {
  const slug = coalesceString(doc?.slug, '');
  const fallback = fallbackBySlug.get(slug);

  const coverImage = doc?.coverImage;
  const imageAlt = coalesceString(
    coverImage?.alt,
    coalesceString(fallback?.imageAlt, ''),
  );

  const imageSrc =
    imageSrcFromSanity(coverImage, { width: 1600, quality: 85 })
    || (fallback?.image ? assetUrl(fallback.image) : '');

  return {
    slug: slug || fallback?.slug,
    title: coalesceString(doc?.title, fallback?.title ?? ''),
    titleLines: coalesceArray(doc?.titleLines, fallback?.titleLines),
    meta: coalesceString(doc?.meta, fallback?.meta ?? ''),
    category: coalesceString(doc?.category, fallback?.category ?? ''),
    imageAlt,
    imageSrc,
    description: coalesceString(doc?.description, fallback?.description ?? '') || undefined,
    details: doc?.details?.role || doc?.details?.scope
      ? {
          role: coalesceString(doc.details.role, fallback?.details?.role ?? ''),
          location: coalesceString(doc.details.location, fallback?.details?.location ?? ''),
          scope: coalesceString(doc.details.scope, fallback?.details?.scope ?? ''),
          achievements: coalesceArray(
            doc.details.achievements,
            fallback?.details?.achievements ?? [],
          ),
        }
      : fallback?.details,
  };
}

function normalizeClientLogos(cmsLogos, fallbackLogos) {
  if (!Array.isArray(cmsLogos) || cmsLogos.length === 0) return fallbackLogos;

  return cmsLogos.map((logo, index) => {
    const fb = fallbackLogos[index] || fallbackLogos[0];
    const src =
      imageSrcFromSanity(logo?.image, { width: 400, quality: 90 })
      || fb?.src
      || '';
    return {
      order: logo?.order ?? index,
      src,
      alt: coalesceString(logo?.alt, coalesceString(logo?.image?.alt, fb?.alt ?? '')),
    };
  });
}

function mergeTestimonial(cms, fallback) {
  if (!cms?.text && !cms?.author) return fallback;
  return {
    text: coalesceString(cms.text, fallback?.text ?? ''),
    author: coalesceString(cms.author, fallback?.author ?? ''),
  };
}

/** @param {Record<string, unknown> | null | undefined} raw */
export function normalizeSiteContent(raw) {
  const fallback = buildFallbackContent();
  if (!raw) return { content: fallback, fromCms: false };

  const fallbackBySlug = new Map(fallbackProjects.map((p) => [p.slug, p]));

  const cmsProjects = Array.isArray(raw.projects) ? raw.projects : [];
  const projectsNormalized =
    cmsProjects.length > 0
      ? cmsProjects.map((doc) => normalizeProject(doc, fallbackBySlug))
      : fallback.projects;

  const featuredFromCms = raw.homePage?.featuredProjects
    ?.map((p) => p?.slug)
    .filter(Boolean);

  const featuredProjectSlugs = coalesceArray(featuredFromCms, fallback.homePage.featuredProjectSlugs);

  const home = raw.homePage || {};
  const settings = raw.siteSettings || {};
  const about = raw.aboutPage || {};
  const book = raw.bookPage || {};

  const heroMp4 =
    fileUrlFromSanity(home.heroVideoMp4)
    || fallback.homePage.heroVideoMp4Url;
  const heroWebm =
    fileUrlFromSanity(home.heroVideoWebm)
    || fallback.homePage.heroVideoWebmUrl;

  const contactPhotoSrc =
    imageSrcFromSanity(home.contactPhoto, { width: 1200, quality: 85 })
    || fallback.homePage.contactPhotoSrc;
  const contactPhotoAlt = coalesceString(
    home.contactPhoto?.alt,
    fallback.homePage.contactPhotoAlt,
  );

  const aboutPhotoSrc =
    imageSrcFromSanity(about.photo, { width: 1200, quality: 85 })
    || fallback.aboutPage.photoSrc;
  const aboutPhotoAlt = coalesceString(about.photo?.alt, fallback.aboutPage.photoAlt);

  const homeQuotes = coalesceArray(home.homeQuotes, fallback.homePage.homeQuotes).map(
    (q, i) => mergeTestimonial(q, fallback.homePage.homeQuotes[i]),
  );

  const timeline = coalesceArray(about.timeline, fallback.aboutPage.timeline).map((item, i) => {
    const fb = fallback.aboutPage.timeline[i] || fallback.aboutPage.timeline[0];
    return {
      key: item._key || fb?.key || `item-${i}`,
      periodPlain: coalesceString(item.periodPlain, fb?.periodPlain ?? ''),
      periodBeforeHighlight: coalesceString(
        item.periodBeforeHighlight,
        fb?.periodBeforeHighlight ?? '',
      ),
      periodHighlight: coalesceString(item.periodHighlight, fb?.periodHighlight ?? ''),
      title: coalesceString(item.title, fb?.title ?? ''),
      body: coalesceBlocks(item.body, fb?.body ?? []),
    };
  });

  return {
    fromCms: true,
    content: {
      siteSettings: {
        siteTitle: coalesceString(settings.siteTitle, fallback.siteSettings.siteTitle),
        metaDescription: coalesceString(
          settings.metaDescription,
          fallback.siteSettings.metaDescription,
        ),
        navLogoText: coalesceString(settings.navLogoText, fallback.siteSettings.navLogoText),
        navCtaLabel: coalesceString(settings.navCtaLabel, fallback.siteSettings.navCtaLabel),
        footerLogoText: coalesceString(
          settings.footerLogoText,
          fallback.siteSettings.footerLogoText,
        ),
        footerCopyright: coalesceString(
          settings.footerCopyright,
          fallback.siteSettings.footerCopyright,
        ),
        contactEmail: coalesceString(settings.contactEmail, fallback.siteSettings.contactEmail),
        contactPhoneDisplay: coalesceString(
          settings.contactPhoneDisplay,
          fallback.siteSettings.contactPhoneDisplay,
        ),
        contactPhoneTel: coalesceString(
          settings.contactPhoneTel,
          fallback.siteSettings.contactPhoneTel,
        ),
        workCategories: coalesceArray(
          settings.workCategories,
          fallback.siteSettings.workCategories,
        ),
      },
      homePage: {
        heroHeadline1: coalesceString(home.heroHeadline1, fallback.homePage.heroHeadline1),
        heroHeadline2: coalesceString(home.heroHeadline2, fallback.homePage.heroHeadline2),
        heroPills: coalesceArray(home.heroPills, fallback.homePage.heroPills),
        heroCtaLabel: coalesceString(home.heroCtaLabel, fallback.homePage.heroCtaLabel),
        heroVideoMp4Url: heroMp4,
        heroVideoWebmUrl: heroWebm,
        introLead: coalesceString(home.introLead, fallback.homePage.introLead),
        introBody: coalesceBlocks(home.introBody, fallback.homePage.introBody),
        introLinkLabel: coalesceString(home.introLinkLabel, fallback.homePage.introLinkLabel),
        statsCitiesHeading: coalesceString(
          home.statsCitiesHeading,
          fallback.homePage.statsCitiesHeading,
        ),
        statsCities: coalesceArray(home.statsCities, fallback.homePage.statsCities),
        clientLogosLabel: coalesceString(
          home.clientLogosLabel,
          fallback.homePage.clientLogosLabel,
        ),
        homeQuotes,
        servicesTitle: coalesceString(home.servicesTitle, fallback.homePage.servicesTitle),
        servicesIntroLead: coalesceString(
          home.servicesIntroLead,
          fallback.homePage.servicesIntroLead,
        ),
        servicesIntroRest: coalesceString(
          home.servicesIntroRest,
          fallback.homePage.servicesIntroRest,
        ),
        servicesCtaLabel: coalesceString(
          home.servicesCtaLabel,
          fallback.homePage.servicesCtaLabel,
        ),
        services: coalesceArray(home.services, fallback.homePage.services).map((s, i) => {
          const fb = fallback.homePage.services[i];
          return {
            num: coalesceString(s.num, fb?.num ?? ''),
            name: coalesceString(s.name, fb?.name ?? ''),
            intro: coalesceString(s.intro, fb?.intro ?? ''),
            items: coalesceArray(s.items, fb?.items ?? []),
          };
        }),
        workTitle: coalesceString(home.workTitle, fallback.homePage.workTitle),
        featuredProjectSlugs: coalesceArray(featuredProjectSlugs, allFeaturedSlugs),
        contactTitle: coalesceString(home.contactTitle, fallback.homePage.contactTitle),
        contactSubcopy: coalesceString(home.contactSubcopy, fallback.homePage.contactSubcopy),
        contactPhotoSrc,
        contactPhotoAlt,
        contactCtaLabel: coalesceString(
          home.contactCtaLabel,
          fallback.homePage.contactCtaLabel,
        ),
      },
      aboutPage: {
        pageTitle: coalesceString(about.pageTitle, fallback.aboutPage.pageTitle),
        introParagraph: coalesceString(
          about.introParagraph,
          fallback.aboutPage.introParagraph,
        ),
        bodyParagraphs: coalesceArray(
          about.bodyParagraphs,
          fallback.aboutPage.bodyParagraphs,
        ),
        photoSrc: aboutPhotoSrc,
        photoAlt: aboutPhotoAlt,
        quoteBeforeTimeline: mergeTestimonial(
          about.quoteBeforeTimeline,
          fallback.aboutPage.quoteBeforeTimeline,
        ),
        timeline,
        quoteAfterTimeline: mergeTestimonial(
          about.quoteAfterTimeline,
          fallback.aboutPage.quoteAfterTimeline,
        ),
      },
      bookPage: {
        pageTitle: coalesceString(book.pageTitle, fallback.bookPage.pageTitle),
        backLinkLabel: coalesceString(book.backLinkLabel, fallback.bookPage.backLinkLabel),
        yourDetailsLegend: coalesceString(
          book.yourDetailsLegend,
          fallback.bookPage.yourDetailsLegend,
        ),
        nameLabel: coalesceString(book.nameLabel, fallback.bookPage.nameLabel),
        namePlaceholder: coalesceString(book.namePlaceholder, fallback.bookPage.namePlaceholder),
        emailLabel: coalesceString(book.emailLabel, fallback.bookPage.emailLabel),
        emailPlaceholder: coalesceString(
          book.emailPlaceholder,
          fallback.bookPage.emailPlaceholder,
        ),
        phoneLabel: coalesceString(book.phoneLabel, fallback.bookPage.phoneLabel),
        phonePlaceholder: coalesceString(
          book.phonePlaceholder,
          fallback.bookPage.phonePlaceholder,
        ),
        helpLegend: coalesceString(book.helpLegend, fallback.bookPage.helpLegend),
        helpOptions: coalesceArray(book.helpOptions, fallback.bookPage.helpOptions),
        eventLegend: coalesceString(book.eventLegend, fallback.bookPage.eventLegend),
        eventDetailOptions: coalesceArray(
          book.eventDetailOptions,
          fallback.bookPage.eventDetailOptions,
        ),
        submitLabel: coalesceString(book.submitLabel, fallback.bookPage.submitLabel),
        submittingLabel: coalesceString(
          book.submittingLabel,
          fallback.bookPage.submittingLabel,
        ),
        successMessage: coalesceString(
          book.successMessage,
          fallback.bookPage.successMessage,
        ),
        privacyNotice: coalesceString(book.privacyNotice, fallback.bookPage.privacyNotice),
      },
      projects: projectsNormalized,
      clientLogos: normalizeClientLogos(raw.clientLogos, fallback.clientLogos),
    },
  };
}
