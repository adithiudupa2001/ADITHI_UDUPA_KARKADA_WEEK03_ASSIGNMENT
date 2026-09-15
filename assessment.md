Name: Adithi Udupa Karkada

## 1. Project Overview

My project is Paws & Home SG, a platform that I want to eventually develop into a one stop platform for animal adoption in Singapore.

The main idea is to make the adoption process easier for someone who is interested in adopting an animal. I want the platform to eventually cover the whole journey, starting from finding an animal, making an enquiry, visiting the shelter, bringing the animal home and getting help with aftercare.

In Week 1, I mainly worked on the front end. I focused on making the website easy to understand and making it simple for someone to find an animal and take the next step.

In Week 2, I added the back end and live data. I added live weather and bus information, improved the Adopt Me and Schedule a Visit forms and connected the form submissions to email.

I also removed the Donate Money section from the website. I had this section in the earlier version, but I could not make it actually work with a proper back end. I felt that it was better to remove it instead of showing a feature that looked like it worked but actually did not. This was one of the main decisions I made during Week 2.

The animal information in the current version is still sample data. I could not find a suitable live animal adoption API that I could use for this assignment. For now, I used live weather and transport information because these are still useful to someone who is planning a visit to the shelter. In the future, I would like to create or connect the platform to a proper animal adoption database so that the animals shown on the website can also be real and live.

## 2. Front End Assessment

### FE1. The purpose of the website should be clear

Why it matters:

Someone visiting the website for the first time should be able to understand that it is an animal adoption platform and know what they can do on the website.

How I would test it:

I would show the website to someone who has not seen it before and ask them what they think the website is for. They should be able to identify that it is for animal adoption and that they can enquire about an animal or schedule a visit.

Self assessment: Met

I think the purpose of the website is clear from the home page. The animals, adoption information and the main actions all make it clear that the website is about adopting animals.

### FE2. A user should be able to start the adoption process without instructions

Why it matters:

The main purpose of the website is to make adoption easier. A user should not need someone to explain where to go or what to click.

How I would test it:

I would give the website to someone who has never used it before and ask them to find an animal and start an enquiry or schedule a visit.

Self assessment: Met

The website has clear actions for the animals and the user can open the enquiry or visit form from there. I also improved these forms in Week 2 so that they actually submit the information instead of just being a front end form.

### FE3. The website should work on both phone and laptop

Why it matters:

A user could find the website on their phone, so the main adoption journey should not only work on a laptop.

How I would test it:

I would open the website on a laptop and on a phone and try to browse the animals and start an enquiry. The buttons, cards and forms should all remain usable.

Self assessment: Met

The website is responsive and the main parts of the adoption journey can be used on smaller screens as well.

### FE4. The website should not show features that do not actually work

Why it matters:

The user should be able to trust what the website is showing them. If something says that they can do something, they should actually be able to do it.

How I would test it:

I would go through the main buttons and sections on the website and check whether they actually do what they say they do.

Self assessment: Met

This was something I paid more attention to in Week 2. I removed the Donate Money section because I could not make it work properly. I felt it was better to have fewer features that actually work than to have more features just for the website to look complete.

### FE5. A user should be able to track an enquiry after submitting it

Why it matters:

The adoption journey does not end when someone submits an enquiry. If someone has enquired about an animal, they should be able to come back and see what they have submitted and what is happening with their request.

How I would test it:

I would submit an adoption enquiry and then come back to the website. I would check whether I can see my previous enquiry and whether I can see its current status.

Self assessment: Not met

This is something that is missing in my current version. A user can submit an enquiry or schedule a visit, but there is no section where they can see their previous requests or track what is happening with them.

This is also something that I think is important for my bigger vision of the platform. I want the platform to support the user throughout the adoption process, and request tracking would be an important part of that.

## 3. Back End Assessment

### BE1. Live information should actually come from a live source

Why it matters:

The purpose of adding a back end in Week 2 was to make parts of the website actually use live information rather than only using information stored in the front end.

How I would test it:

I would check the back end and see whether the weather and bus information is being requested from the external APIs through the application.

Self assessment: Met

I added an API layer to the project and connected it to live weather and LTA bus information. The front end gets this information through the back end.

### BE2. There should be a health check for the back end

Why it matters:

If something goes wrong, I should be able to understand whether the back end is working and whether the required service is configured.

How I would test it:

I would open the /api/health endpoint and check that it gives useful information about the status of the back end without showing the actual credential.

Self assessment: Met

I added the /api/health endpoint as part of the Week 2 back end.

### BE3. External credentials should be handled safely

Why it matters:

API credentials should not unnecessarily be exposed in the front end or public GitHub repository.

How I would test it:

I would check the repository and the front end to make sure that the credentials used for the back end services are not publicly exposed.

Self assessment: Partly met

For the LTA integration, I kept the credential on the server side and configured it through Vercel. It is not in my GitHub repository or front end.

However, I did not handle the Web3Forms access key in the same way. I gave the key to the AI agent in my prompt so that it could connect the enquiry form to my email, and the generated implementation placed the key in the client side code.

This showed me that I need to be more careful when checking how the AI has implemented external services, even when the feature itself is working.

### BE4. Live data should be cached

Why it matters:

There is no need to repeatedly request the same information from an external service every few seconds. Caching helps reduce unnecessary requests while still keeping the information reasonably current.

How I would test it:

I would check the API implementation and confirm that the live data has a cache and that the cache period makes sense for the type of information.

Self assessment: Met

The live data endpoints have caching. The bus information is cached for a shorter period because it changes more frequently, while the weather information has a longer cache period.

### BE5. The transport feature should still be useful when there is no direct bus

Why it matters:

If there is no direct bus from the user's starting point to the shelter, it does not mean that the user cannot get there. The website should still help them find a route.

How I would test it:

I would enter a bus stop where there is no direct bus to the destination. The website should show an alternative route that involves a change and tell the user where they need to change.

Self assessment: Met

The first version of this feature did not meet this requirement. It only worked properly when there was a direct bus to the destination.

I tested some different bus stops and found that when there was no direct bus, the website did not give the user a useful answer. I realised that this was not really enough for the user's actual problem.

I then changed my prompt and asked the agent to look for a route that involved a transfer when there was no direct bus. The agent then implemented the one change route logic.

This was a good example of how I had to test the result myself and realise that my original instruction was not complete enough.

## 4. Overall Product Assessment

Overall, I would say that the current product is a functional prototype, but it is not yet the complete one stop adoption platform that I eventually want to build.

The main features that I decided to keep are working. The user can browse the animals, submit an adoption enquiry, schedule a visit and use the live transport and weather information.

I also think removing the Donate Money section was the right decision because I could not support what the feature was claiming to do.

The bus routing was another important improvement. The first version technically worked, but it did not handle the situation where there was no direct bus. After testing it, I realised that the user still needed an answer in that situation. I changed the requirement and the agent implemented the alternative route.

There are still some important things missing from the product. The biggest ones are having real animal adoption data, allowing users to track their enquiries and having a more complete aftercare system.

At the moment, if a user sends an enquiry, they do not have anywhere on the website to see that enquiry again. They have submitted the request, but the platform does not continue supporting them after that point. This is something I would want to fix in the next version.

The product therefore works for the main features that are currently shown, but there is still a lot of room to build out the full adoption journey.

## 5. Human AI Collaboration Assessment

### Q1. Where did the agent make me faster, and by how much?

The AI agent made me much faster, especially when I was moving from the front end to the back end.

I knew what I wanted the product to do, but I did not have the same level of technical knowledge to build all the API routes, connect the external APIs, handle the responses and add caching myself.

The agent helped me implement these parts much faster. This meant that I could spend more time thinking about what the user actually needed instead of spending all my time writing the technical implementation.

For example, with the transport feature, I could tell the agent what I wanted the user to see and then let it work on the actual routing implementation. I was therefore able to focus more on testing the result and deciding whether it was actually useful.

### Q2. Where did it cost me time, and whose fault was that?

The main example was the bus routing.

The first version of the bus functionality worked when there was a direct bus from the selected starting point to the destination. However, when I selected some bus stops that did not have a direct bus to the destination, the website did not show a useful result.

I realised that the problem was partly with my original instruction. I had asked for live bus information, but I had not clearly said what should happen when there was no direct bus.

I then changed my prompt and asked the agent to find an alternative route with a transfer and show the user where they needed to change.

So I would say this was partly an instruction problem rather than just an agent problem. The agent did what I had asked, but I had not thought through the full user scenario when I first gave the instruction.

### Q3. Did the agent ever give me something that looked right but was not?

Yes. The clearest example was the Web3Forms integration.

I wanted the Adopt Me and Schedule a Visit forms to send the submissions to my email. I created the Web3Forms setup and gave the access key to the AI agent in my prompt so that it could implement this.

The final form worked and the submission could be sent successfully, so from a user point of view it looked correct.

Later, when I looked more closely at the implementation, I realised that the key had been placed in the client side code. I had handled the LTA credential differently by keeping it on the server side, but I had not followed the same approach for Web3Forms.

This showed me that I cannot only check whether something works. I also need to look at how the agent has built it.

### Q4. What did I have to know to supervise the agent?

I needed to understand what I wanted the product to do and enough of the technical side to check whether the agent had actually built it correctly.

For the back end, I needed to understand things like the difference between the front end and back end, how APIs work, where credentials should be kept, what caching does and how the live information reaches the user.

I also needed to understand the actual user problem so that I could test whether the solution made sense.

The bus routing example was useful here. I did not need to know exactly how to write the route finding code, but I needed to recognise that showing no result was not good enough when an alternative route could exist.

I think the biggest thing I learned is that using AI does not mean I can stop understanding what is being built. I may not write every line of code myself, but I still need enough knowledge to test it and question it.

### Q5. Which decisions did I keep, and should I have kept more or fewer?

I kept most of the main product decisions myself. I decided what the platform was for, who the user was, what the main adoption journey should be and which features should stay.

For example, I decided to remove the Donate Money section because I could not make it actually work. I also decided that the bus feature should not simply say that there was no direct bus. I wanted it to give the user another option if a transfer was possible.

However, one decision that I should have made earlier was to include request tracking as part of the main user journey.

I focused a lot on making sure that a user could submit an enquiry. Once the form was working, I considered that part of the journey complete. But actually, from the user's point of view, the journey does not end after clicking submit.

If I want this to become a one stop adoption platform, the user should be able to come back and see their enquiry, the animal they enquired about and eventually the status of that request.

So I think I should have kept more focus on the complete journey instead of only focusing on making the individual features work.

### Q6. What would I do differently in my next build?

For my next build, I would first map out the complete user journey before adding more features.

I would think about it as:

find an animal, make an enquiry, schedule a visit, track the request, adopt the animal and then get aftercare support.

I would make request tracking part of the system from the beginning instead of adding it later. The user should have some way of seeing the enquiries they have made and what is happening with them.

I would also like to work on the animal data itself. At the moment, the animal information is sample data because I did not have a suitable live animal adoption API. In the future, I would like to create or connect to a proper repository where real animal information can be stored and updated.

I would also be more specific in my prompts about what should happen in different situations. The bus example showed me that a feature can work for the normal case but still fail when the user does something slightly different.

I would therefore spend more time thinking about cases such as no data, no direct route, an unavailable service and what the user should see after submitting something.

## 6. Overall Self Assessment

I think Week 2 successfully moved my project from being mainly a front end into a more functional product with a real back end and live data.

The features that I have kept in the current version are working, and I made a conscious decision not to keep features that I could not make functional.

The bus routing example was probably the most useful part of the process for me because it showed me the difference between something technically working and something actually being useful to the user. The first version worked in the normal case, but testing showed me that it did not work well enough when there was no direct bus. I then changed the requirement and improved it.

At the same time, I can see that my current product is still only an early version of the bigger idea I have in mind.

The biggest missing part is that the user cannot currently track their enquiries after submitting them. They can start the adoption journey, but the platform does not yet support them through the rest of it.

I also still need a proper source for real animal adoption data and a more complete aftercare system.

Overall, I would say that I have built a functional base for the product, but there is still a lot to build before it becomes the one stop adoption platform that I originally imagined.

The biggest thing I learned from working with the AI agent is that I still need to make the important product decisions myself. The agent can help me build things much faster, but I need to decide what the user actually needs, test whether the feature solves the problem and notice when something is missing.
