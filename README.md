    
    
    A restaurant searching app which uses React/Redux and Zomato API.

    Assumptions: 
   
       1>  On selection of option a modal pop-
           up should appear containing order details of Restaurant.
           For the above case, I was not sure of what does it mean by "order details of Restaurant".
           Initally, I thought it is the menu-list. But the "menu_url" parameter returned by the zomato api is a link to zomato page.
           Therefore, I have used an image returned in "featured_image" parameter by the API.  

        2> The max number of results displayed in the Restaurant Listing page is 20.
 
 
    Instructions to run the application

        1>yarn install
        2>yarn start
