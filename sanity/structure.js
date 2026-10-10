const SINGLETONS = [
  { type: 'siteSettings', title: 'Site settings', id: 'siteSettings' },
  { type: 'homePage', title: 'Home page', id: 'homePage' },
  { type: 'aboutPage', title: 'About page', id: 'aboutPage' },
  { type: 'bookPage', title: 'Book page', id: 'bookPage' },
];

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ type, title, id }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id).title(title)),
      ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('clientLogo').title('Client logos'),
    ]);
