"use client";

import { useEffect, useRef } from "react";
import { Product } from "@/lib/products";

export default function ProductList({ products }: { products: Product[] }) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="products-list">
      {products.map((product, i) => (
        <article
          key={product.id}
          className="card product-card fade-in"
          ref={(el) => { itemRefs.current[i] = el; }}
        >
          {product.image && (
            <div className="card-image">
              <img src={product.image} alt={product.name} />
            </div>
          )}
          <div className="card-body">
            <h3>{product.name}</h3>
            <p className="product-tagline">{product.oneLiner}</p>
            <p className="product-desc">{product.description}</p>
            <div className="product-actions">
              <a className="btn" href={product.link} target="_blank" rel="noopener noreferrer">
                Link
              </a>
              <a className="btn primary" href={product.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
