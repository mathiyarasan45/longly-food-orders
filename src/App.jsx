import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import OffersPage from './pages/OffersPage';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';

// Modals
import ProductDetailModal from './components/ProductDetailModal';
import LocationModal from './components/LocationModal';
import CheckoutModal from './components/CheckoutModal';
import JoinSellerModal from './components/JoinSellerModal';
import TrackOrderModal from './components/TrackOrderModal';
import WishlistModal from './components/WishlistModal';

// Sample Data
import { SAMPLE_LOCATIONS, PRODUCTS, INITIAL_ORDERS } from './data/mockData';

export default function App() {
  // Navigation State: 'Home' | 'Categories' | 'Offers' | 'Orders' | 'Account'
  const [activeTab, setActiveTab] = useState('Home');

  // Orders Sub-tab State: 'orders' | 'cart'
  const [activeSubTab, setActiveSubTab] = useState('orders');

  // Location State
  const [currentLocation, setCurrentLocation] = useState(SAMPLE_LOCATIONS[0]);

  // Search Query State
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State: [{ product, quantity }]
  const [cartItems, setCartItems] = useState([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 1 },
  ]);

  // Wishlist State: array of product IDs
  const [wishlistIds, setWishlistIds] = useState(['prod-1', 'prod-2']);

  // Orders History State
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Handler Functions
  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prevItems, { product, quantity: qty }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const handleUpdateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  // Buy Now Handler (Adds to cart and opens checkout modal directly)
  const handleBuyNow = (product) => {
    handleAddToCart(product, 1);
    if (selectedProduct) setSelectedProduct(null);
    setIsCheckoutModalOpen(true);
  };

  // Wishlist Handler Function
  const handleToggleWishlist = (product) => {
    setWishlistIds((prevIds) => {
      const exists = prevIds.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist.`);
        return prevIds.filter((id) => id !== product.id);
      } else {
        showToast(`Added "${product.name}" to Wishlist!`);
        return [...prevIds, product.id];
      }
    });
  };

  // Place Order Success Handler
  const handlePlaceOrderSuccess = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // Clear cart after order placement
    setIsCheckoutModalOpen(false);
    setActiveTab('Orders');
    setActiveSubTab('orders');
    showToast(`Order ${newOrder.id} placed successfully!`);
  };

  const handleCancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
    showToast(`Order ${orderId} has been cancelled.`);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#17231B] font-body selection:bg-[#EAF5EC] selection:text-[#176B3A]">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17231B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/30 font-heading text-xs font-semibold flex items-center gap-2.5 animate-bounce-subtle">
          <span className="w-2 h-2 rounded-full bg-[#FF6B2C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        location={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => {
          setActiveTab('Orders');
          setActiveSubTab('cart');
        }}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 5-Item Navigation Bar: Home, Categories, Offers, Orders, Account */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {activeTab === 'Home' && (
          <HomePage
            location={currentLocation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            setActiveTab={setActiveTab}
            onOpenSellerModal={() => setIsSellerModalOpen(true)}
          />
        )}

        {activeTab === 'Categories' && (
          <CategoriesPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {activeTab === 'Offers' && (
          <OffersPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {activeTab === 'Orders' && (
          <OrdersPage
            orders={orders}
            cartItems={cartItems}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onTrackOrder={(ord) => setTrackingOrder(ord)}
            onCancelOrder={handleCancelOrder}
            onOpenCheckout={() => setIsCheckoutModalOpen(true)}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />
        )}

        {activeTab === 'Account' && (
          <AccountPage
            location={currentLocation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            setActiveTab={setActiveTab}
            setActiveSubTab={setActiveSubTab}
            onOpenWishlist={() => setIsWishlistModalOpen(true)}
            onOpenSellerModal={() => setIsSellerModalOpen(true)}
            orders={orders}
            onTrackOrder={(ord) => setTrackingOrder(ord)}
          />
        )}

      </main>

      {/* Interactive Modals */}
      
      {/* 1. Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />
      )}

      {/* 2. Delivery Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />

      {/* 3. Central Delivery Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={cartItems}
        onPlaceOrderSuccess={handlePlaceOrderSuccess}
        currentLocation={currentLocation}
      />

      {/* 4. Join Seller Onboarding Modal */}
      <JoinSellerModal
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
      />

      {/* 5. Track Order Status Modal */}
      <TrackOrderModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />

      {/* 6. Saved Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Main App Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
      />

    </div>
  );
}
