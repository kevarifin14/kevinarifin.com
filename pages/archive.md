---
layout: page
title: Archive
permalink: /archive
---
### Posts

{% for post in site.posts %}
[{{ post.title }}]({{ post.permalink }})
{% endfor %}

### Thought Bytes

{% assign emails = site.thought_bytes | sort: 'date' | reverse %}
{% for email in emails %}
[{{ email.title }}]({{ email.url }})
{% endfor %}

