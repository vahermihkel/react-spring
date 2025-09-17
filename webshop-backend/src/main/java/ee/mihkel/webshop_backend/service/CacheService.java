package ee.mihkel.webshop_backend.service;

import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.CacheBuilder;

import ee.mihkel.webshop_backend.entity.Product;
import ee.mihkel.webshop_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class CacheService {

    @Autowired
    ProductRepository productRepository;

    private LoadingCache<Long, Product> productCache = CacheBuilder.newBuilder()
            .maximumSize(1000)
            .expireAfterWrite(10, TimeUnit.MINUTES)
            .build(
                    new CacheLoader<>() {
                        @Override
                        public Product load(Long id) {
                            return productRepository.findById(id).orElseThrow();
                        }
                    });

    public Product getProductFromCache(Long id) throws ExecutionException {
        return productCache.get(id);
    }

    public void updateProductInCache(Long id, Product product) {
        productCache.put(id, product);
    }

    public void deleteProductFromCache(Long id) {
        productCache.invalidate(id);
    }

}
