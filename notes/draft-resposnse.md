Markdown overview

While markdown would be a more flexible and common approach i am not interested right now in introducting the complexity of parsing and rendering markdown on the ui as well as writing using any of the markdown features such as bold underline e.t.c

ID vs Slug

While in the past we have relied on only the slug or made the id a slug i would like to separte these moving forward. The idea is that the slug is a url friendly human readable identifier for whatever entity it represents an is primarily intended to be used in urls. As such it will ideally be title to the title or some description of the content/entity it addresses. As you might imagine this might be subject to change and thus so should the slug. keeping a dedicated uuid field allows for other entities that reference the target entity to have a fixed unbreaking reference.

Destination relationships:

For now this can be implemented as a simple string array containing the slugs of the countries that the specialist operates in

To consider though some specialists might be based in one country but offer services targeted at customers in one or more specific countries
For example a relocation service might be based in thailand, and specifically help uk citizen move their items to thailand united-kindgom -> thailand
They might offer that service in the other direction as well

A specialist might be based in the uk and offer consulting services to uk citizens looking to retire in the uae but not offer that service the other way around
Storing this distinction might be relevant as it might allow for the platform to better signify the relationship of a specialist/service to a country when view the page or content for that country
we might for example only want to show a specialist that offers uk -> uae consulting so a user that we know is in the uk when they view the uae page

so strong the direction of the relationship of the relevant countries in this case might be pertinent

Language Support

This should be implemented more broadly across the platform. For the simple implementation should have an array of language objects. these objects would have the code (iso639 2 letter code) and the title (the display name of the language)
we should then have a languages property on the specialist that is an array of the iso639 codes of the language

Trust Indicators

For now we will add a field to the specialist objects named "partnered". This will be boolean field. The rating field will be examined later

Structured services

This is a good idea.

for now we can have a simple service object

- id
- slug
- title
- description
- category

in light of having categories for each service should they be removed from the main Specialist object to ensure a single source of truth and reduce overhead for now.

in the future having a dedicated page for some services would be a good idea, there we can flesh out in a easily accessible manner what the service is exactly, when or why the user might need it, have some suggestions of alternatives, have some notion of ratings, point to reviews, have external resources e.t.c. We might also some how introduce the concept of a service being sort of like a menu item? adding pricing information specifically and some other structured data. Then we can build a comparison tool based of this

Resource Normalization

For now lets keep the resources separate and use the resource objects in this specialist feature to prototype a version two for the current resources implementation as well as keep a specialist specific version of the resources. then when that is hashed out we will migrate the old resources to the version two format/structure and then extract the resources from the specialist into the general resources data.
