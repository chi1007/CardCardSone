// 獲取新聞容器
const newsContainer = document.querySelector('.news-container');

// 創建新聞項目的函數
function createNewsItem(imageUrl, title, description) {
const newsItem = document.createElement('div');
newsItem.classList.add('news-item');

const image = document.createElement('img');
image.src = imageUrl;
image.alt = title;

const heading = document.createElement('h3');
heading.textContent = title;

const desc = document.createElement('p');
desc.textContent = description;

newsItem.appendChild(image);
newsItem.appendChild(heading);
newsItem.appendChild(desc);

return newsItem;
}

// 添加動態新聞項目
const newsData = [
{
imageUrl: 'news-image-3.jpg',
title: '新聞標題 3',
description: '新聞描述 3...'
},
{
imageUrl: 'news-image-4.jpg',
title: '新聞標題 4',
description: '新聞描述 4...'
}
];

newsData.forEach(item => {
const newsItem = createNewsItem(item.imageUrl, item.title, item.description);
newsContainer.appendChild(newsItem);
});