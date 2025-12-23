package com.natswarchuan.genericservice.validation;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.HandlerMapping;
import java.util.Map;

/**
 * Validator cho {@link SqlConstraint}.
 *
 * <p>
 * Thực thi câu native SQL để kiểm tra tính hợp lệ. Hỗ trợ bind dependencies từ
 * HttpServletRequest (path, param, header).
 *
 * @author NatswarChuan
 */
@Component
public class SqlConstraintValidator implements ConstraintValidator<SqlConstraint, Object> {

  @PersistenceContext
  private EntityManager entityManager;

  @Autowired
  private HttpServletRequest request;

  private String sql;
  private String valueParam;
  private String[] dependencies;

  @Override
  public void initialize(SqlConstraint annotation) {
    this.sql = annotation.sql();
    this.valueParam = annotation.valueParam();
    this.dependencies = annotation.dependencies();
  }

  @Override
  @Transactional(readOnly = true)
  public boolean isValid(Object value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    try {
      Query query = entityManager.createNativeQuery(sql);

      // Bind giá trị chính nếu có trong SQL
      if (sql.contains(":" + valueParam)) {
        query.setParameter(valueParam, value);
      }

      // Bind dependencies từ request và validated object
      bindDependencies(query, value);

      Object result = query.getSingleResult();

      if (result == null) {
        return false;
      }

      if (result instanceof Number) {
        return ((Number) result).longValue() > 0;
      }

      if (result instanceof Boolean) {
        return (Boolean) result;
      }

      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private void bindDependencies(Query query, Object value) {
    if (dependencies == null || dependencies.length == 0) {
      return;
    }

    for (String dep : dependencies) {
      // Format: sqlParam:source/key
      String[] parts = dep.split(":", 2);
      if (parts.length != 2)
        continue;

      String sqlParam = parts[0].trim();
      String definition = parts[1].trim();

      String[] sourceParts = definition.split("/", 2);
      if (sourceParts.length != 2)
        continue;

      String source = sourceParts[0].trim();
      String key = sourceParts[1].trim();

      Object paramValue = resolveValue(source, key, value);
      if (sql.contains(":" + sqlParam)) {
        query.setParameter(sqlParam, paramValue);
      }
    }
  }

  @SuppressWarnings("unchecked")
  private Object resolveValue(String source, String key, Object value) {
    switch (source.toLowerCase()) {
      case "param":
        return request != null ? request.getParameter(key) : null;
      case "header":
        return request != null ? request.getHeader(key) : null;
      case "path":
        if (request == null)
          return null;
        Object pathVarsObj = request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        if (pathVarsObj instanceof Map) {
          Map<String, String> pathVars = (Map<String, String>) pathVarsObj;
          return pathVars.get(key);
        }
        return null;
      case "field":
        // Sử dụng BeanWrapper hoặc Reflection để lấy giá trị field từ object 'value'
        if (value == null)
          return null;
        try {
          org.springframework.beans.BeanWrapper wrapper = new org.springframework.beans.BeanWrapperImpl(value);
          return wrapper.getPropertyValue(key);
        } catch (Exception e) {
          // Log or ignore if field not found
          return null;
        }
      default:
        return null;
    }
  }
}
