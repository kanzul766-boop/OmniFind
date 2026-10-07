import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import CollectionCard from "../components/CollectionCard.jsx";
import { clearCollection } from "../redux/features/collectionSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CollectionPage = () => {
  const items = useSelector((state) => state.collection?.items) || [];
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearCollection());
    toast.info("All treats cleared! 🍓", { autoClose: 1500 });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute top-20 right-10 text-3xl opacity-10 animate-float">
        🧁
      </div>
      <div
        className="absolute bottom-20 left-10 text-3xl opacity-10 animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        🍪
      </div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 animate-fade-up">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ember-500 font-extrabold mb-1 flex items-center gap-1.5">
              <span>💝</span> Your Treats Vault
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-black text-teal-800">
              {items.length > 0 ? "Saved Sweets" : "Empty Vault"}
            </h1>
            {items.length > 0 && (
              <p className="text-teal-600/70 mt-2 text-sm font-medium">
                You have{" "}
                <span className="text-ember-500 font-bold">{items.length}</span>{" "}
                delicious {items.length === 1 ? "item" : "items"} saved! 🍓
              </p>
            )}
          </div>

          {items.length > 0 && (
            <button
              onClick={clear}
              className="px-5 py-2.5 rounded-full font-bold text-xs tracking-wider text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
            >
              🗑️ Clear All Treats
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 px-8 glass-card border-2 border-dashed border-ember-200 max-w-xl mx-auto !rounded-[2.5rem] bg-white/90 shadow-xl shadow-ember-500/5">
            <div className="text-7xl mb-6 animate-float inline-block filter drop-shadow-md">
              <img className="w-30" src="../dist/assets/icon.png" alt="" />
            </div>
            <h2 className="font-display text-3xl font-black text-teal-800 mb-3">
              No treats saved yet!
            </h2>
            <p className="text-teal-600/70 mb-8 text-sm max-w-xs mx-auto leading-relaxed font-medium">
              Your vault is hungry. Go back to discover, explore sweet media,
              and tap the <span className="text-ember-500">💝</span> on any item
              to fill it up!
            </p>
            <Link
              to="/"
              className="btn-ember inline-flex items-center justify-center gap-2 !rounded-full px-8 py-3 text-sm font-bold tracking-wider shadow-lg shadow-ember-500/30"
            >
              Start Exploring 🧁 →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div
                key={item?.id || i}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                <CollectionCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
