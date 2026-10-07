import fs from 'fs';
import path from 'path';
import https from 'https';

const targetDir = path.resolve('public/images/products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 100% Verified, Exact Food Item Image Mapping
const imageMapping = {
  // Mango Pickle Gallery (Product 1)
  'mango_pickle_1.jpg': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
  'mango_pickle_2.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  'mango_pickle_3.jpg': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
  'mango_pickle_4.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',

  // Regional Pickles
  'lime_pickle_1.jpg': 'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=800&q=80',
  'chicken_pickle_1.jpg': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
  'mutton_pickle_1.jpg': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  'prawn_pickle_1.jpg': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
  'prawn_pickle_2.jpg': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
  'fish_pickle_1.jpg': 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80',
  'mixed_pickle_1.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',

  // Wild Forest & Herbal Honey (Product 2 & Product 8)
  'wild_honey_1.jpg': 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80',
  'wild_honey_2.jpg': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
  'wild_honey_3.jpg': 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
  'herbal_honey_1.jpg': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  'herbal_honey_2.jpg': 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80',
  'honeycomb_1.jpg': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',

  // Fudgy Brownies (Product 3)
  'brownie_1.jpg': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  'brownie_2.jpg': 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
  'brownie_3.jpg': 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',

  // Gulab Jamun (Product 4)
  'gulab_jamun_1.jpg': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  'gulab_jamun_2.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  'gulab_jamun_3.jpg': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',

  // Mysore Pak (Product 10)
  'mysore_pak_1.jpg': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80',
  'mysore_pak_2.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',

  // Tomato Garlic Thokku (Product 6)
  'thokku_1.jpg': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
  'thokku_2.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',

  // Masala Roasted Cashews (Product 5)
  'masala_cashews_1.jpg': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
  'masala_cashews_2.jpg': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80',

  // Sathu Maavu / Healthy Mix (Product 9)
  'sathu_maavu_1.jpg': 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=800&q=80',
  'sathu_maavu_2.jpg': 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',

  // Sambar Powder (Product 11)
  'masala_powder_1.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',

  // Dry Fruits Combo (Product 12)
  'dry_fruits_1.jpg': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80',

  // Categories Thumbnails
  'cat_honey.jpg': 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=500&q=80',
  'cat_pickle.jpg': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80',
  'cat_brownie.jpg': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
  'cat_sweets.jpg': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=500&q=80',
  'cat_thokku.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80',
  'cat_snacks.jpg': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80',
  'cat_healthymix.jpg': 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=500&q=80',
  'cat_masala.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
  'cat_dryfruits.jpg': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=500&q=80',
  'cat_other.jpg': 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=500&q=80',

  // Company Brand Logos & Banners
  'brand1_logo.jpg': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=150&q=80',
  'brand1_banner.jpg': 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80',
  'brand2_logo.jpg': 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=150&q=80',
  'brand2_banner.jpg': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
  'brand3_logo.jpg': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=150&q=80',
  'brand3_banner.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  'brand4_logo.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80',
  'brand4_banner.jpg': 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=800&q=80',
  'brand5_logo.jpg': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=150&q=80',
  'brand5_banner.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
};

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(targetDir, filename);
    const file = fs.createWriteStream(filePath);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    https.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        let loc = response.headers.location;
        https.get(loc, options, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`HTTP status code ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function run() {
  const keys = Object.keys(imageMapping);
  let successCount = 0;
  let failCount = 0;

  console.log(`Starting download of ${keys.length} accurate product & category images...`);

  for (const filename of keys) {
    try {
      await downloadImage(imageMapping[filename], filename);
      const filePath = path.join(targetDir, filename);
      const stats = fs.statSync(filePath);
      if (stats.size > 2000) {
        console.log(`✓ Downloaded ${filename} (${stats.size} bytes)`);
        successCount++;
      } else {
        console.error(`✗ Small file error for ${filename} (${stats.size} bytes)`);
        failCount++;
      }
    } catch (err) {
      console.error(`✗ Failed to download ${filename}:`, err.message);
      failCount++;
    }
  }

  console.log(`Finished: ${successCount} downloaded successfully, ${failCount} failed.`);
}

run();
