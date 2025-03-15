// Custom Reviews Implementation matching the screenshot

document.addEventListener('DOMContentLoaded', function() {
    // Replace the reviews section with custom reviews
    replaceReviewsWithCustom();
});

// Replace the reviews section with custom reviews
function replaceReviewsWithCustom() {
    const reviewsSection = document.querySelector('.reviews-section');
    if (!reviewsSection) return;
    
    // Clear the reviews section
    reviewsSection.innerHTML = '';
    
    // Create custom reviews section
    const customReviewsSection = document.createElement('div');
    customReviewsSection.className = 'custom-reviews-section';
    
    // Create container for RTL animation
    const customReviewsContainer = document.createElement('div');
    customReviewsContainer.className = 'custom-reviews-container';
    
    // Review data
    const reviews = [
        {
            name: 'A',
            fullName: 'Awesome Pye',
            date: 'April 17, 2024',
            content: 'He had helped us with our combat system and even tweaked it a little bit for us. Prec what he did and I will for sure hire him again in the future.'
        },
        {
            name: 'CA',
            fullName: 'Cameron',
            date: 'July 5, 2024',
            content: 'Great to work with, definitely knows his stuff and very professional. Good speed and great communication. Would highly recommend him for any of your scripting needs.'
        },
        {
            name: 'CFM_SAJ',
            fullName: 'CFM_SAJ',
            date: 'September 28, 2024',
            content: 'First and foremost, professionalism is what retained me. The swift responses gave me hope. And the reassurance helped me to trust and rest till the project was completed in 24 hours. I commissioned a currency system merge with my existing features and a new shop system, and Kool Kid Developer delivered on it. I would 100% suggest it.'
        },
        {
            name: 'BO',
            fullName: 'Boobah',
            date: 'July 3, 2024',
            content: 'Glad I hired him, great to work with and is excited to see my game release which brings me further joy in having him contribute to my game, would 100% recommend.'
        }
    ];
    
    // Create custom review cards
    reviews.forEach(review => {
        const card = createCustomReviewCard(review);
        customReviewsContainer.appendChild(card);
    });
    
    // Clone cards for infinite loop
    reviews.forEach(review => {
        const card = createCustomReviewCard(review);
        customReviewsContainer.appendChild(card);
    });
    
    // Add container to section
    customReviewsSection.appendChild(customReviewsContainer);
    
    // Add section to reviews section
    reviewsSection.appendChild(customReviewsSection);
}

// Create a custom review card
function createCustomReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'custom-review-card';
    
    // Add loading circle
    const loadingCircle = document.createElement('div');
    loadingCircle.className = 'custom-loading-circle';
    card.appendChild(loadingCircle);
    
    // Create reviewer
    const reviewer = document.createElement('div');
    reviewer.className = 'custom-reviewer';
    
    // Reviewer icon
    const reviewerIcon = document.createElement('div');
    reviewerIcon.className = 'custom-reviewer-icon';
    reviewerIcon.textContent = review.name;
    
    // Reviewer info
    const reviewerInfo = document.createElement('div');
    reviewerInfo.className = 'custom-reviewer-info';
    
    const reviewerName = document.createElement('h3');
    reviewerName.textContent = review.fullName;
    
    const reviewDate = document.createElement('p');
    reviewDate.textContent = `Reviewed on ${review.date}`;
    
    reviewerInfo.appendChild(reviewerName);
    reviewerInfo.appendChild(reviewDate);
    
    reviewer.appendChild(reviewerIcon);
    reviewer.appendChild(reviewerInfo);
    
    // Review text
    const reviewText = document.createElement('p');
    reviewText.className = 'custom-review-text';
    reviewText.textContent = `"${review.content}"`;
    
    // Add elements to card
    card.appendChild(reviewer);
    card.appendChild(reviewText);
    
    return card;
}