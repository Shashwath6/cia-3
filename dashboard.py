import streamlit as st
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

# Page config
st.set_page_config(page_title="BMTC Dashboard", page_icon="🚌", layout="wide", initial_sidebar_state="collapsed")

# Dark theme CSS
st.markdown("""
<style>
    body { background-color: #0d1117; color: #c9d1d9; }
    .main { background-color: #0d1117; }
    h1, h2, h3 { color: #ffffff; }
    h2 { border-bottom: 3px solid #1f6feb; padding-bottom: 15px; margin-top: 40px; }
    [data-testid="stSidebar"] { display: none; }
</style>
""", unsafe_allow_html=True)

# Title
st.markdown("<h1 style='text-align: center;'>🚌 BMTC Analysis Dashboard</h1>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: #58a6ff; font-size: 1.2rem;'>Service Quality & Customer Satisfaction Analysis</p>", unsafe_allow_html=True)
st.divider()

# Sample Data
age_groups = ['18-25', '26-35', '36-45', '46-55', '55+']
genders = ['Male', 'Female', 'Other']
occupations = ['Student', 'Working Prof', 'Business', 'Homemaker', 'Retired']
distances = ['<5 km', '5-10 km', '10-20 km', '20-50 km', '>50 km']
usage = ['Daily', '4-5 times', '2-3 times', 'Weekly', 'Rarely']

# ============================================================================
# SECTION 1: SERVICE RATINGS ANALYSIS
# ============================================================================
st.markdown("<h2>📊 Service Ratings Analysis</h2>", unsafe_allow_html=True)

# Chart 1: Ratings by Age Group (1-5 Scale)
fig1 = go.Figure()
fig1.add_trace(go.Bar(x=age_groups, y=[3.2, 3.5, 3.8, 3.4, 3.1], name='Fares', marker_color='#ef4444'))
fig1.add_trace(go.Bar(x=age_groups, y=[3.5, 3.7, 3.9, 3.6, 3.3], name='Frequency', marker_color='#f97316'))
fig1.add_trace(go.Bar(x=age_groups, y=[3.3, 3.6, 3.9, 3.5, 3.2], name='Cleanliness', marker_color='#eab308'))
fig1.add_trace(go.Bar(x=age_groups, y=[3.4, 3.8, 4.0, 3.6, 3.3], name='Safety', marker_color='#22c55e'))
fig1.add_trace(go.Bar(x=age_groups, y=[3.2, 3.5, 3.8, 3.5, 3.2], name='Route Coverage', marker_color='#06b6d4'))
fig1.add_trace(go.Bar(x=age_groups, y=[3.1, 3.4, 3.7, 3.4, 3.1], name='Last-mile', marker_color='#3b82f6'))
fig1.add_trace(go.Bar(x=age_groups, y=[3.0, 3.3, 3.6, 3.3, 3.0], name='Digital', marker_color='#8b5cf6'))

fig1.update_layout(
    barmode='group',
    title='Ratings by Age Group (1-5 Scale)',
    xaxis_title='Age Group',
    yaxis_title='Rating (1-5)',
    paper_bgcolor='#0d1117',
    plot_bgcolor='#161b22',
    font=dict(color='#c9d1d9', size=12),
    hovermode='x',
    height=500
)
st.plotly_chart(fig1, use_container_width=True)

# Chart 2: Overall Ratings (1-10 Scale)
fig2 = go.Figure()
fig2.add_trace(go.Bar(x=age_groups, y=[6.5, 7.2, 7.8, 7.1, 6.3], name='Satisfaction', marker_color='#3b82f6'))
fig2.add_trace(go.Bar(x=age_groups, y=[6.3, 7.0, 7.6, 6.9, 6.1], name='Recommendation', marker_color='#10b981'))

fig2.update_layout(
    barmode='group',
    title='Overall Ratings by Age Group (1-10 Scale)',
    xaxis_title='Age Group',
    yaxis_title='Rating (1-10)',
    paper_bgcolor='#0d1117',
    plot_bgcolor='#161b22',
    font=dict(color='#c9d1d9', size=12),
    hovermode='x',
    height=500
)
st.plotly_chart(fig2, use_container_width=True)

# ============================================================================
# SECTION 2: DEMOGRAPHICS
# ============================================================================
st.markdown("<h2>👥 Demographics</h2>", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    # Gender Distribution
    fig3 = go.Figure(data=[go.Pie(labels=genders, values=[275, 200, 25], marker_colors=['#3b82f6', '#ec4899', '#8b5cf6'])])
    fig3.update_layout(
        title='Gender Distribution',
        paper_bgcolor='#0d1117',
        font=dict(color='#c9d1d9', size=12),
        height=400
    )
    st.plotly_chart(fig3, use_container_width=True)

with col2:
    # Age Group Distribution
    fig4 = go.Figure(data=[go.Pie(labels=age_groups, values=[100, 175, 125, 60, 40], marker_colors=['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'])])
    fig4.update_layout(
        title='Age Group Distribution',
        paper_bgcolor='#0d1117',
        font=dict(color='#c9d1d9', size=12),
        height=400
    )
    st.plotly_chart(fig4, use_container_width=True)

col3, col4 = st.columns(2)

with col3:
    # Occupation Distribution
    fig5 = go.Figure(data=[go.Pie(labels=occupations, values=[125, 225, 50, 60, 40], marker_colors=['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'])])
    fig5.update_layout(
        title='Occupation Distribution',
        paper_bgcolor='#0d1117',
        font=dict(color='#c9d1d9', size=12),
        height=400
    )
    st.plotly_chart(fig5, use_container_width=True)

with col4:
    # Travel Distance Distribution
    fig6 = go.Figure(data=[go.Bar(x=distances, y=[75, 150, 175, 75, 25], marker_color='#f59e0b')])
    fig6.update_layout(
        title='Travel Distance Distribution',
        xaxis_title='Distance',
        yaxis_title='Count',
        paper_bgcolor='#0d1117',
        plot_bgcolor='#161b22',
        font=dict(color='#c9d1d9', size=12),
        height=400
    )
    st.plotly_chart(fig6, use_container_width=True)

# ============================================================================
# SECTION 3: SATISFACTION METRICS
# ============================================================================
st.markdown("<h2>⭐ Satisfaction Metrics</h2>", unsafe_allow_html=True)

fig7 = go.Figure()
fig7.add_trace(go.Scatter(x=age_groups, y=[6.5, 7.2, 7.8, 7.1, 6.3], name='Satisfaction', mode='lines+markers', 
                          line=dict(color='#3b82f6', width=3), marker=dict(size=10)))
fig7.add_trace(go.Scatter(x=age_groups, y=[6.3, 7.0, 7.6, 6.9, 6.1], name='Recommendation', mode='lines+markers',
                          line=dict(color='#10b981', width=3), marker=dict(size=10)))

fig7.update_layout(
    title='Satisfaction vs Recommendation Likelihood',
    xaxis_title='Age Group',
    yaxis_title='Score (1-10)',
    paper_bgcolor='#0d1117',
    plot_bgcolor='#161b22',
    font=dict(color='#c9d1d9', size=12),
    hovermode='x',
    height=500
)
st.plotly_chart(fig7, use_container_width=True)

# ============================================================================
# SECTION 4: USAGE PATTERNS
# ============================================================================
st.markdown("<h2>🔄 Usage Patterns</h2>", unsafe_allow_html=True)

col5, col6 = st.columns([1, 1])

with col5:
    # Usage Frequency
    fig8 = go.Figure(data=[go.Pie(labels=usage, values=[150, 125, 100, 75, 50], 
                                    marker_colors=['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'])])
    fig8.update_layout(
        title='Bus Usage Frequency',
        paper_bgcolor='#0d1117',
        font=dict(color='#c9d1d9', size=12),
        height=400
    )
    st.plotly_chart(fig8, use_container_width=True)

with col6:
    # Lowest Rated Aspects
    fig9 = go.Figure(data=[go.Bar(y=age_groups, x=[3.0, 3.3, 3.6, 3.3, 3.0], orientation='h', marker_color='#f97316')])
    fig9.update_layout(
        title='Lowest Rated Aspects by Age',
        xaxis_title='Rating (1-5)',
        yaxis_title='Age Group',
        paper_bgcolor='#0d1117',
        plot_bgcolor='#161b22',
        font=dict(color='#c9d1d9', size=12),
        height=400
    )
    st.plotly_chart(fig9, use_container_width=True)

# ============================================================================
# SECTION 5: CORRELATION ANALYSIS
# ============================================================================
st.markdown("<h2>🔗 Correlation Analysis</h2>", unsafe_allow_html=True)

aspects = ['Fares', 'Frequency', 'Cleanliness', 'Safety', 'Routes', 'Last-mile', 'Digital', 'Satisfaction', 'Recommendation']
corr_matrix = [
    [1.00, 0.85, 0.72, 0.68, 0.65, 0.62, 0.58, 0.75, 0.73],
    [0.85, 1.00, 0.78, 0.75, 0.72, 0.68, 0.64, 0.82, 0.80],
    [0.72, 0.78, 1.00, 0.88, 0.75, 0.72, 0.68, 0.85, 0.82],
    [0.68, 0.75, 0.88, 1.00, 0.72, 0.68, 0.64, 0.80, 0.78],
    [0.65, 0.72, 0.75, 0.72, 1.00, 0.90, 0.72, 0.78, 0.76],
    [0.62, 0.68, 0.72, 0.68, 0.90, 1.00, 0.68, 0.75, 0.73],
    [0.58, 0.64, 0.68, 0.64, 0.72, 0.68, 1.00, 0.70, 0.68],
    [0.75, 0.82, 0.85, 0.80, 0.78, 0.75, 0.70, 1.00, 0.95],
    [0.73, 0.80, 0.82, 0.78, 0.76, 0.73, 0.68, 0.95, 1.00]
]

fig10 = go.Figure(data=go.Heatmap(
    z=corr_matrix,
    x=aspects,
    y=aspects,
    colorscale='RdBu_r',
    zmid=0,
    zmin=-1,
    zmax=1,
    colorbar=dict(title='Correlation')
))

fig10.update_layout(
    title='Correlation Matrix - Service Aspects',
    paper_bgcolor='#0d1117',
    plot_bgcolor='#161b22',
    font=dict(color='#c9d1d9', size=11),
    height=600
)
st.plotly_chart(fig10, use_container_width=True)

# ============================================================================
# Footer
# ============================================================================
st.divider()
st.markdown("<p style='text-align: center; color: #8b949e;'>BMTC Dashboard • Generated with Streamlit & Plotly</p>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: #8b949e;'>© 2025 | Data Analysis & Visualization</p>", unsafe_allow_html=True)
