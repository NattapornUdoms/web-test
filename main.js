// Event listener for brand form submission
document.getElementById('brandForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const brandName = document.getElementById('brandName').value;
    fetchImages(brandName);
});

// Function to fetch default logos
function fetchDefaultLogos() {
    const defaultLogos = [
        { name: 'Coca-Cola', url: 'https://seeklogo.com/images/C/Coca-Cola-logo-56985C1769-seeklogo.com.png' },
        { name: 'Pepsi', url: 'https://pbs.twimg.com/profile_images/1741893411211247616/Mw_0Xhcc_400x400.jpg' },
        { name: 'Nike', url: 'https://i.pinimg.com/736x/27/c7/9c/27c79c9ad3c764555c3d3424efc5233c.jpg' },
        { name: 'Adidas', url: 'https://i.pinimg.com/736x/4f/2f/97/4f2f9790bc2d20eabbf50ec30df861fc.jpg' },
        { name: 'Samsung', url: 'https://www.getsims.com/wp-content/uploads/2018/03/samsung-logo-square.jpg' },
        { name: 'Lays', url: 'https://pbs.twimg.com/profile_images/1174678997374033920/5_6IucF8_400x400.png' },
        { name: 'Google', url: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' },
        { name: 'Amazon', url: 'https://thumbs.dreamstime.com/b/logo-icon-vector-logos-icons-set-social-media-flat-banner-vectors-svg-eps-jpg-jpeg-paper-texture-glossy-emblem-wallpaper-210442240.jpg' }
    ];

    const defaultLogosContainer = document.getElementById('defaultLogos');
    defaultLogos.forEach(logo => {
        const imgElement = document.createElement('img');
        imgElement.src = logo.url;
        imgElement.alt = `${logo.name} logo`;
        imgElement.className = 'brand-image';
        imgElement.addEventListener('click', handleImageClick);
        defaultLogosContainer.appendChild(imgElement);
    });
}

// Function to handle image click
function handleImageClick() {
    const selectedImages = document.querySelectorAll('.brand-image.selected');
    if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        updateImageNumbers();
    } else {
        if (selectedImages.length < 3) {
            this.classList.add('selected');
            updateImageNumbers();
        } else {
            alert('You can select up to 3 images only.');
        }
    }
    const youtubeInput = document.getElementById('youtubeURL');
    youtubeInput.disabled = selectedImages.length === 0;
}

// Function to update image numbers
function updateImageNumbers() {
    const selectedImages = document.querySelectorAll('.brand-image.selected');
    selectedImages.forEach((img, index) => {
        let numberElement = img.querySelector('.number');
        if (!numberElement) {
            numberElement = document.createElement('div');
            numberElement.className = 'number';
            img.appendChild(numberElement);
        }
        numberElement.textContent = index + 1;
    });
    document.querySelectorAll('.brand-image:not(.selected) .number').forEach(num => num.remove());
}

document.addEventListener('DOMContentLoaded', fetchDefaultLogos);

// Function to fetch images from Google Custom Search
function fetchImages(brandName) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';

    const defaultLogosContainer = document.getElementById('defaultLogos');
    defaultLogosContainer.style.display = 'none';

    const apiKey = 'AIzaSyBphqi23J4FHoP3-EfPa3APZ483xuRdXG4';
    const cx = '8674f277df46d4c35';
    const brand = `${brandName} logo square`;

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(brand)}&searchType=image&key=${apiKey}&cx=${cx}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const squareImage = data.items.find(item => item.image && item.image.width === item.image.height);

                if (squareImage) {
                    const imgElement = document.createElement('img');
                    imgElement.src = squareImage.link;
                    imgElement.alt = `${brandName} logo square`;
                    imgElement.className = 'brand-image';
                    imgElement.addEventListener('click', handleImageClick);
                    imageContainer.appendChild(imgElement);
                } else {
                    imageContainer.innerHTML = '<p>No square images found for this brand.</p>';
                }
            } else {
                imageContainer.innerHTML = '<p>No images found for this brand.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            imageContainer.innerHTML = '<p>Failed to fetch images. Please try again later.</p>';
        });
}

function openTab(event, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.style.backgroundColor = "#575757";
}

function openTabByName(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tabName).style.display = "block";
    var activeTabButton = document.querySelector(`button[onclick="openTab(event, '${tabName}')"]`);
    if (activeTabButton) {
        activeTabButton.style.backgroundColor = "#575757";
    }
}
